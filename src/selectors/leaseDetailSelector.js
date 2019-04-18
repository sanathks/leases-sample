import {createSelector} from "reselect";
import ProRataCalculator from "../services/ProRataCalculator";
import * as moment from "moment";

export const getSelectedId = (state, id) => id;
export const getLeases = (state) => state.leases.list;
export const getLease = (state) => state.leaseDetail.data;

export const getTenantName = createSelector(
    [getLeases, getSelectedId],
    (leases, id) => {
        for (let lease of leases) {
            if (lease['id'] === id) {
                return lease['tenant'] ;
            }
        }

        return null;
    }
);

export const getLeaseDetails = createSelector(
    [getLease, getSelectedId, getTenantName],
    (lease, id, tenant) => {
        return {
            ...lease,
            tenant
        }
    }
);

export const getLeasePaymentHistory = createSelector(
    [getLease],
    (lease) => {

        let payments = [];

        if (lease === null) {
            return;
        }
        const frequeancy = {
            weekly: 1,
            fortnightly: 2,
            monthly: 4,
        };

        const proRataCalculator= new ProRataCalculator(lease.start_date, lease.end_date, lease.payment_day);
        const initProRataDays = proRataCalculator.calculateInitialProRataDays();
        const endProRataDays = proRataCalculator.calculateEndProRataDays();
        const firstCycleDate =  proRataCalculator.startDate.clone();
        const lastCycleDate =  proRataCalculator.endDate.clone();
        const ratePerDay = lease.rent / 7;
        let lastCycle = null;

        if (initProRataDays > 0) {
            firstCycleDate.add(initProRataDays, 'days');
            const startDate = proRataCalculator.startDate.clone();
            const firstCycleEnd = firstCycleDate.clone();

            payments.push(generatePaymentEntry(
                startDate,
                firstCycleEnd,
                ratePerDay
            ));
        }

        if (endProRataDays > 0) {
            lastCycleDate.add(-initProRataDays, 'days');
            const endDate = proRataCalculator.endDate.clone();

            lastCycle = generatePaymentEntry(
                lastCycleDate,
                endDate,
                ratePerDay
            );
        }

        const currentDate = firstCycleDate.clone();

        while (currentDate <= lastCycleDate) {
           const from = currentDate.clone();
           const to = currentDate.add( frequeancy[lease.frequency] , 'weeks');

           payments.push(generatePaymentEntry(
                from,
                to,
                ratePerDay
            ));
        }

       if (lastCycle !== null) {
           payments.push(lastCycle);
       }

       return payments;
    }
);

const generatePaymentEntry = (startDate, endDate, ratePerDay) =>  {
    const from = startDate.clone();
    const to = endDate.clone();
    const days = to.diff(from, 'days');
    return {
        from: from.format("YYYY-MM-DD").toString(),
        to: to.format("YYYY-MM-DD").toString(),
        days,
        amount:  Math.round(ratePerDay * days).toFixed(2)
    }
};
