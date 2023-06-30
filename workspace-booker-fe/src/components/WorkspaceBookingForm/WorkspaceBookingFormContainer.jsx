import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

import BookingForm from './BookingForm';

import { AppContext } from '../../context/AppContext';

import {
  CLOSE_DRAWER,
  ADD_WORKSPACE_BOOKING,
  UPDATE_WORKSPACE_BOOKING,
  CANCEL_BOOKING_EDIT
} from '../../actions';

import { convertDateToString, convertStringToDate } from '../../utils/utils';

const FormHeading = styled.span`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 3rem;
  span {
    &:before {
      content: '#';
      color: #888eb0;
    }
  }
`;

const initialValues = {
  id: '',
  status: '',
  clientName: '',
  clientEmail: '',
  createdAt: new Date(),
  paymentDue: new Date(),
  description: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  items: [],
  total: 0
};

const validationSchema = Yup.object({
  clientName: Yup.string().required('required'),
  clientEmail: Yup.string().email('invalid email').required('required'),
  createdAt: Yup.date(),
  paymentDue: Yup.date().min(Yup.ref('createdAt'), "can't be past date"),
  description: Yup.string().required('required'),
  senderAddress: Yup.object().shape({
    street: Yup.string().required('required'),
    city: Yup.string().required('required'),
    postCode: Yup.string().required('required'),
    country: Yup.string().required('required')
  }),
  clientAddress: Yup.object().shape({
    street: Yup.string().required('required'),
    city: Yup.string().required('required'),
    postCode: Yup.string().required('required'),
    country: Yup.string().required('required')
  }),
  items: Yup.array()
    .min(1, 'An item must be added')
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        quantity: Yup.number().required(),
        price: Yup.number().required()
      })
    )
});

function FormContainer() {
  const [workspace, setWorkspace] = useState(null);
  const { dispatch, isEditingWorkspace, editWorkspaceID, workspaces } = useContext(AppContext);

  useEffect(() => {
    if (isEditingWorkspace) {
      let [data] = workspaces.filter((item) => item.id === editWorkspaceID);
      data = {
        ...data,
        createdAt: convertStringToDate(data.createdAt),
        paymentDue: convertStringToDate(data.paymentDue)
      };
      setWorkspace(data);
    }
  }, [isEditingWorkspace, editWorkspaceID]);

  const calcTotal = (items) => {
    if (items.length === 1) {
      return items[0].total;
    }
    const totals = items.map((item) => item.total);
    return totals.reduce((prev, current) => prev + current);
  };

  const onSubmit = (values) => {
    const total = calcTotal(values.items);
    const createdAt = convertDateToString(values.createdAt);
    const paymentDue = convertDateToString(values.paymentDue);
    if (!values.status) {
      const id = nanoid(6);
      dispatch({
        type: ADD_WORKSPACE_BOOKING,
        payload: { ...values, status: 'booked', id, total, createdAt, paymentDue }
      });
    } else if (values.status === 'draft') {
      dispatch({
        type: UPDATE_WORKSPACE_BOOKING,
        payload: { ...values, status: 'booked', total, createdAt, paymentDue }
      });
    } else if (values.status === 'free') {
      dispatch({
        type: UPDATE_WORKSPACE_BOOKING,
        payload: { ...values, total, createdAt, paymentDue }
      });
    }
    dispatch({ type: CLOSE_DRAWER });
  };

  const saveBooking = (values) => {
    const total = calcTotal(values.items);
    const createdAt = convertStringToDate(values.createdAt);
    const paymentDue = convertStringToDate(values.paymentDue);
    if (values.status === 'draft') {
      dispatch({
        type: UPDATE_WORKSPACE_BOOKING,
        payload: { ...values, total, createdAt, paymentDue }
      });
    } else {
      const id = nanoid(6);
      dispatch({
        type: ADD_WORKSPACE_BOOKING,
        payload: { ...values, status: 'draft', id, total, createdAt, paymentDue }
      });
    }
    dispatch({ type: CLOSE_DRAWER });
  };

  const discard = () => {
    dispatch({ type: CLOSE_DRAWER });
    if (isEditingWorkspace) {
      dispatch({ type: CANCEL_BOOKING_EDIT });
    }
  };

  return (
    <>
      {workspace && (
        <FormHeading>
          Edit <span>{workspace.id}</span>
        </FormHeading>
      )}
      {!workspace && <FormHeading>New Booking</FormHeading>}
      <BookingForm
        validationSchema={validationSchema}
        initialValues={workspace || initialValues}
        discard={discard}
        saveBooking={saveBooking}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default FormContainer;
