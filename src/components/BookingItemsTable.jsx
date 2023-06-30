import styled from 'styled-components';

import { formatPrice } from '../utils/utils';

const Table = styled.table`
  width: 100%;
  background-color: ${({ theme }) => theme.bookingTable.bg};
  border-radius: 0.5rem;
  overflow: hidden;
  border-collapse: collapse;
`;

const TableHead = styled.th`
  padding: 2rem;
  color: ${({ theme }) => theme.bookingTable.heading};
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: -0.23px;
`;

const ItemNameHead = styled(TableHead)`
  text-align: left;
`;

const ItemQtyHead = styled(TableHead)`
  text-align: center;
`;

const ItemPriceHead = styled(TableHead)`
  text-align: right;
`;

const ItemTotalHead = styled(TableHead)`
  text-align: right;
`;

const Body = styled.tbody`
  tr td {
    padding: 0 2rem 2rem 2rem;
    font-weight: 700;
    font-size: 0.75rem;
  }
`;

const ItemNameCol = styled.td`
  color: ${({ theme }) => theme.text.h1};
`;

const ItemQtyCol = styled.td`
  text-align: center;
`;

const ItemPriceCol = styled.td`
  text-align: right;
`;

const ItemTotalCol = styled(ItemNameCol)`
  text-align: right;
  color: ${({ theme }) => theme.text.h1};
`;

const Footer = styled.tfoot`
  background-color: ${({ theme }) => theme.bookingTable.footer.bg};
  color: ${({ theme }) => theme.bookingTable.footer.color};
  tr td {
    padding: 1.5rem 2rem;
  }
`;

const TotalLabel = styled.td`
  font-size: 0.6875rem;
  font-weight: 500;
  text-align: left;
`;

const BookingTotal = styled.td`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.42px;
  text-align: right;
`;

function BookingItemsTable({ status, id, items, total }) {
  return (
    <Table>
      <thead>
        <tr>
          <ItemNameHead>Item Name</ItemNameHead>
          <ItemQtyHead>QTY.</ItemQtyHead>
          <ItemPriceHead>Price</ItemPriceHead>
          <ItemTotalHead>Total</ItemTotalHead>
        </tr>
      </thead>
      <Body>
        {items.map(({ name, price, quantity, total }, index) => {
          return (
            <tr key={index + id}>
              <ItemNameCol>{name}</ItemNameCol>
              <ItemQtyCol>{quantity}</ItemQtyCol>
              <ItemPriceCol>{formatPrice(price)}</ItemPriceCol>
              <ItemTotalCol>{formatPrice(total)}</ItemTotalCol>
            </tr>
          );
        })}
      </Body>
      <Footer>
        <tr>
          <TotalLabel>{status === 'booked' ? 'Grand total' : 'Amount Due'}</TotalLabel>
          <BookingTotal colSpan={3}>{formatPrice(total)}</BookingTotal>
        </tr>
      </Footer>
    </Table>
  );
}

export default BookingItemsTable;
