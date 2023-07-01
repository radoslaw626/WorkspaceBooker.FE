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

const WorkspaceIdName = styled.div`
  display: block;
`;

const WorkspaceID = styled.p`
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

const WorkerPosition = styled.h1`
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
  const [workspace, setWorkspace] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { workspaceId } = useParams();
  const { workspaces, dispatch } = useContext(AppContext);



  useEffect(() => {
    const fetchBookingId = async () => {
      try {
        const response = await fetch('https://workspacebooker.azurewebsites.net/api/workspace-bookings');
        const data = await response.json();

        const booking = data.find(booking => booking.workspaceId === workspaceId);
        if (booking) {
          setBookingId(booking.id);
        }
      } catch (error) {
        console.error('Fetching error:', error);
      }
    };

    fetchBookingId();
  }, [workspaceId]);

  useEffect(() => {
    const [currentWorkspace] = workspaces.filter((workspace) => workspace.workspace.id === workspaceId);
    setWorkspace(currentWorkspace);
  }, [workspaceId, workspaces]);

  return (
    <MainContainer>
      <BackButton to="/">
        <img src={IconArrowLeft} alt="" />
        Go back
      </BackButton>
      {workspace && (
        <>
          <Header>
            <StatusLbl>Status</StatusLbl>
            <WorkspaceStatusBadge status={workspace.status} />
            <BookingActions>
              {workspace.status == 'booked' && (
                  <Button
                      variant="warning"
                      aria-label="Delete Invoice"
                      onClick={() => setIsDeleteModalOpen(true)}>
                    Cancel Booking
                  </Button>
              )}

            </BookingActions>
          </Header>
          {workspace.status==='booked' && (
          <DetailsCard>
            <DetailsCardGrid>
              <WorkspaceIdName className="invoice-id-name">
                <WorkspaceID>{workspace.workspace.code}</WorkspaceID>
                <div className="booking-dates">
                  <BookingInfo
                      className="created-at"
                      label="Booked From"
                      value={workspace.bookedFrom ? formatDate(workspace.bookedFrom) : ''}
                  />
                  <BookingInfo
                      className="payment-due"
                      label="Booked Due"
                      value={workspace.bookedDue ? formatDate(workspace.bookedDue) : ''}
                  />
                </div>
              </WorkspaceIdName>

              <div className="client-name-address">
                <BookingInfo className="client-name" label="Worker" value={workspace.worker.name} />
                <BookingInfo className="client-name" label="Position" value={workspace.worker.position} />
                <BookingInfo className="client-email" label="Email" value={workspace.worker.email} />
              </div>

            </DetailsCardGrid>
          </DetailsCard>)}
        </>
      )}
      {workspace && (
        <DeleteBookingModal
          id={bookingId}
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
      )}
    </MainContainer>
  );
}

export default BookingDetails;
