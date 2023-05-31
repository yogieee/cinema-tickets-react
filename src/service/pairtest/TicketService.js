import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // throws InvalidPurchaseException
    const result = {
      totalAmountToPaid: 0,
      totalNoOfTicketsBooked: 0,
      paymentStatus: false,
    };
    try {
      //create objects
      var ADULT = new TicketTypeRequest("ADULT", ticketTypeRequests[0].ADULT);
      var CHILD = new TicketTypeRequest("CHILD", ticketTypeRequests[0].CHILD);
      // eslint-disable-next-line no-unused-vars
      var INFANT = new TicketTypeRequest(
        "INFANT",
        ticketTypeRequests[0].INFANT
      );

      //get total no of tickets
      var totalNoOfTickets = ADULT.getNoOfTickets() + CHILD.getNoOfTickets();
      console.log("Total no of tickets: " + totalNoOfTickets);

      //validate ticket counts
      this.#validateNoOfTickets(totalNoOfTickets, ADULT.getNoOfTickets());

      //reserve seats
      var seatReservationService = new SeatReservationService();
      //call seat reservation service
      seatReservationService.reserveSeat(accountId, totalNoOfTickets);

      //make payments
      var totalAmountToPay =
        ADULT.getNoOfTickets() * 20 + CHILD.getNoOfTickets() * 10;
      console.log("Total amount: " + totalAmountToPay);

      var ticketPaymentService = new TicketPaymentService();
      //call payment service
      ticketPaymentService.makePayment(accountId, totalAmountToPay);

      result.totalAmountToPaid = totalAmountToPay;
      result.totalNoOfTicketsBooked = totalNoOfTickets;
      result.paymentStatus = true;
      return result;
    } catch (error) {
      // console.log(error.name + " : " + error.message);
      throw error;
    }
  }

  #validateNoOfTickets(totalNoOfTickets, adultNoOfTickets) {
    if (adultNoOfTickets < 1) {
      throw new InvalidPurchaseException(
        "Child and Infant tickets cannot be purchased without purchasing an Adult ticket."
      );
    }

    if (totalNoOfTickets > 20) {
      throw new InvalidPurchaseException(
        "Only a maximum of 20 tickets that can be purchased at a time."
      );
    }
  }
}

// var t = new TicketService();
// t.purchaseTickets("as", { ADULT: 1, CHILD: 2, INFANT: 1 });
