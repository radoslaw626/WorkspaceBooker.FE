import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import MainContainer from '../layout/MainContainer';
import WorkspaceStatusBadge from '../components/WorkspaceStatusBadge';
import BookingInfo from '../components/BookingInfo';
import Button from '../components/Button';
import DeleteBookingModal from '../components/DeleteBookingModal';

import { AppContext } from '../context/AppContext';

import { MARK_WORKSPACE_BOOKED,
        EDIT_WORKSPACE_BOOKING } from '../actions';
import { formatDate } from '../utils/utils';
import deviceSize from '../styles/breakpoints';

import IconArrowLeft from '../assets/icon-arrow-left.svg';

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.25px;
  text-decoration: none;
  color: ${({ theme }) => theme.text.h1};
  margin-bottom: 2rem;
  img {
    margin-right: 1.4375rem;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.invoiceDetails.bg};
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  @media screen and (min-width: ${deviceSize.md}) {
    justify-content: flex-start;
    gap: 16px;
  }
`;

const StatusLbl = styled.p`
  font-size: 0.75rem;
  color: #858bb2;
  font-weight: 500;
`;

const BookingActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.invoiceDetails.bg};
  padding: 1.3125rem 1.5rem;
  @media screen and (min-width: ${deviceSize.md}) {
    position: static;
    margin-left: auto;
    padding: 0;
  }
`;

const DetailsCard = styled.main`
  background-color: ${({ theme }) => theme.invoiceDetails.bg};
  border-radius: 0.5rem;
  padding: 1.5rem;
  color: ${({ theme }) => theme.text.color2};
  line-height: 1.6;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  margin-bottom: 2.8125rem;
`;

const DetailsCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'nameid nameid'
    'senderaddress senderaddress'
    'invoicedates clientnameaddress'
    'clientemail clientemail';
  gap: 30px 20px;
  margin-bottom: 2.5rem;
  .invoice-id-name {
    grid-area: nameid;
  }
  .sender-address {
    grid-area: senderaddress;
  }
  .invoice-dates {
    grid-area: invoicedates;
  }
  .client-email {
    grid-area: clientemail;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'nameid nameid senderaddress'
      'invoicedates clientnameaddress clientemail';
  }
`;

const InvoiceIdName = styled.div`
  display: block;
`;

const InvoiceID = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.h1};
  letter-spacing: -0.23px;
  margin-bottom: 0.25rem;
  margin: 0;
  &:before {
    content: '#';
    color: #7e88c3;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    font-size: 1rem;
  }
`;

const InvoiceName = styled.h1`
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0.25rem 0;
`;

const SenderAddress = styled.address`
  font-size: 0.6875rem;
  font-style: normal;
  letter-spacing: -0.23px;
  @media screen and (min-width: ${deviceSize.md}) {
    text-align: right;
  }
`;

function BookingDetails() {
  const [booking, setBooking] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { bookingId } = useParams();
  const { workspaces, dispatch } = useContext(AppContext);

  useEffect(() => {
    const [currentBooking] = workspaces.filter((booking) => booking.id === bookingId);
    setBooking(currentBooking);
  }, [bookingId, workspaces]);

  return (
    <MainContainer>
      <BackButton to="/">
        <img src={IconArrowLeft} alt="" />
        Go back
      </BackButton>
      {booking && (
        <>
          <Header>
            <StatusLbl>Status</StatusLbl>
            <WorkspaceStatusBadge status={booking.status} />
            <BookingActions>
              {booking.status !== 'booked' && (
                <Button
                  variant="secondary"
                  aria-label="Edit Invoice"
                  onClick={() => dispatch({ type: EDIT_WORKSPACE_BOOKING, payload: booking.id })}>
                  Edit
                </Button>
              )}
              <Button
                variant="warning"
                aria-label="Delete Invoice"
                onClick={() => setIsDeleteModalOpen(true)}>
                Delete
              </Button>
            </BookingActions>
          </Header>
          <DetailsCard>
            <DetailsCardGrid>
              <InvoiceIdName className="invoice-id-name">
                <InvoiceID>{booking.id}</InvoiceID>
                <InvoiceName>{booking.description}</InvoiceName>
              </InvoiceIdName>
              <SenderAddress className="sender-address">
                {booking.senderAddress.street}
                <br />
                {booking.senderAddress.city}
                <br />
                {booking.senderAddress.postCode}
                <br />
                {booking.senderAddress.country}
              </SenderAddress>
              <div className="booking-dates">
                <BookingInfo
                  className="created-at"
                  label="Booked From"
                  value={formatDate(booking.createdAt)}
                />
                <BookingInfo
                  className="payment-due"
                  label="Booked Due"
                  value={formatDate(booking.paymentDue)}
                />
              </div>
              <div className="client-name-address">
                <BookingInfo className="client-name" label="Worker" value={booking.clientName} />
              </div>
              <BookingInfo className="client-email" label="Email" value={booking.clientEmail} />
            </DetailsCardGrid>
          </DetailsCard>
        </>
      )}
      {booking && (
        <DeleteBookingModal
          id={booking.id}
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
      )}
    </MainContainer>
  );
}

export default BookingDetails;
