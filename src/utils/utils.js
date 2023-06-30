import format from 'date-fns/format';

export function formatDate(date) {
  return format(new Date(date), 'dd LLL yyyy');
}

export function convertDateToString(date) {
  return date.toLocaleDateString();
}

export function convertStringToDate(str) {
  return new Date(str);
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
}

export function workspacesCountText(workspacesCount) {
  let msg;
  if (workspacesCount === 0) {
    msg = 'No Workspaces Bookings';
  } else if (workspacesCount === 1) {
    msg = '1 Workspace Booking';
  } else {
    msg = `${workspacesCount} Workspaces Bookings`;
  }
  return msg;
}
