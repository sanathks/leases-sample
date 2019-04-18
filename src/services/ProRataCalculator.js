import moment from "moment";

export default class ProRataCalculator {

    endDate;
    paymentDate;
    startDate;

    /**
     * @param {string} startDate
     * @param {string} endDate
     * @param {string} paymentDate
     */
    constructor(startDate, endDate, paymentDate) {
        this.paymentDate = moment().day(paymentDate).day();
        this.startDate = moment(startDate, "YYYY-MM-DD");
        this.endDate = moment(endDate, "YYYY-MM-DD");
    }

    calculateInitialProRataDays() {
        let firstPaymentDate = this.firstPaymentDate();
        const startDate = this.startDate.clone();

        return moment.duration(firstPaymentDate.diff(startDate)).asDays()
    }

    firstPaymentDate() {
        const startDate = this.startDate.clone();

        if (startDate.isoWeekday() <= this.paymentDate) {
            return startDate.isoWeekday(this.paymentDate);
        } else {
            return startDate.add(1, 'weeks').isoWeekday(this.paymentDate);
        }
    }

    lastPaymentDate() {
        const endDate = this.endDate.clone();
        if (endDate.isoWeekday() >= this.paymentDate) {
            return endDate.isoWeekday(this.paymentDate);
        } else {
            return endDate.add(-1, 'weeks').isoWeekday(this.paymentDate);
        }
    }

    calculateEndProRataDays() {
        let lastPaymentDate = this.lastPaymentDate();
        const endDate = this.endDate.clone();

        return moment.duration(endDate.diff(lastPaymentDate)).asDays()
    }


}
