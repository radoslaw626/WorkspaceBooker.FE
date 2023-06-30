import { Formik, Form } from 'formik';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import TextField from '../TextField';
import Button from '../Button';
import DatePickerField from '../DatePickerField';

import deviceSize from '../../styles/breakpoints';

const FieldSet = styled.fieldset`
  border: none;
  margin-bottom: 1rem;
`;

const Legend = styled.legend`
  display: block;
  margin-bottom: 1.5rem;
  font-family: Spartan, sans-serif;
  font-weight: 700;
  color: ${({ theme }) => theme.form.legend.color};
  letter-spacing: -0.25px;
`;

const FormTextField = styled(TextField)`
  margin-bottom: 1.5rem;
`;

const AddressFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 24px;
  div:last-child {
    grid-column: 1/3;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    grid-template-columns: repeat(3, 1fr);
    div:last-child {
      grid-column: auto;
    }
  }
`;

const BookingDatesGrid = styled.div`
  margin-top: 1.5rem;
  input {
    margin-bottom: 1.5rem;
  }
  @media screen and (min-width: ${deviceSize.md}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 24px;
    align-items: flex-end;
    div:last-child {
      grid-column: 1/3;
    }
  }
`;

const FormBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  .discard {
    margin-right: auto;
  }
`;

function BookingForm({ initialValues, validationSchema, onSubmit, saveBooking, discard }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}>
      {({ values, errors, setFieldValue, resetForm }) => {
        return (
          <Form>
            <FieldSet>
              <Legend>Worker</Legend>
              <FormTextField
                label="Worker Id"
                id="sender-street-address"
                name="senderAddress.street"
                type="text"
                aria-required="true"
              />
            </FieldSet>
            <FieldSet>
              <Legend>Workspace</Legend>
              <FormTextField
                label="Workspace Id"
                id="sender-client-name"
                name="clientName"
                type="text"
                aria-required="true"
              />
            </FieldSet>
            <BookingDatesGrid>
              <div>
                <DatePickerField
                  label="Booking From"
                  name="createdAt"
                  id="createdAt"
                  value={values.createdAt}
                  selected={values.createdAt}
                  onChange={setFieldValue}
                  error={errors.createdAt}
                  disabled={values.status === 'booked'}
                />
              </div>
              <div>
                <DatePickerField
                  label="Booking Due"
                  name="paymentDue"
                  id="paymentDue"
                  selected={values.paymentDue}
                  value={values.paymentDue}
                  onChange={setFieldValue}
                  error={errors.paymentDue}
                />
              </div>
            </BookingDatesGrid>
            {values.status === '' && (
              <FormBottom>
                <Button
                  type="button"
                  variant="secondary"
                  className="discard"
                  onClick={() => {
                    resetForm();
                    discard();
                  }}>
                  Discard
                </Button>
                <Button type="submit" className="save-send">
                  Save & Send
                </Button>
              </FormBottom>
            )}
            {values.status === 'draft' && (
              <FormBottom>
                <Button
                  type="button"
                  variant="secondary"
                  className="discard"
                  onClick={() => {
                    resetForm();
                    discard();
                  }}>
                  Cancel
                </Button>
                <Button type="submit" className="save-send">
                  Save & Send
                </Button>
              </FormBottom>
            )}
            {values.status === 'booked' && (
              <FormBottom>
                <Button
                  type="button"
                  variant="secondary"
                  className="discard"
                  onClick={() => {
                    resetForm();
                    discard();
                  }}>
                  Cancel
                </Button>
                <Button type="submit" className="save-send">
                  Save Changes
                </Button>
              </FormBottom>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default BookingForm;
