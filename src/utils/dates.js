const CURRENT_DATE = "NULL";
const DAY_IN_MS = 86400000;

export function getTimePeriodTogether({ start1, end1, start2, end2 }) {
  const startDateMS1 = getMSFromDate(start1);
  const endDateMS1 = getMSFromDate(end1);

  const startDateMS2 = getMSFromDate(start2);
  const endDateMS2 = getMSFromDate(end2);

  const togetherStart = Math.max(startDateMS1, startDateMS2);
  const togetherEnd = Math.min(endDateMS1, endDateMS2);

  if (togetherEnd < togetherStart) {
    return 0;
  }

  return togetherEnd - togetherStart;
}

export function getDays(dateInMS) {
  return Math.floor(dateInMS / DAY_IN_MS);
}

function getMSFromDate(date) {
  if (date === CURRENT_DATE) {
    return new Date().valueOf();
  }

  // Date is in ms
  if (!isNaN(date)) {
    return new Date(Number(date)).valueOf();
  }

  return new Date(date).valueOf();
}
