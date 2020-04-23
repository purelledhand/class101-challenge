import React from 'react';
import styled from 'styled-components';

export const CollectionHeader = styled.div`
  width: 100%;
  height: 192px;
  display: flex;
  flex-direction: column;
  padding-top: 72px;
  box-sizing: border-box;
`;

export const CollectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: rgb(27, 28, 29);
  line-height: 52px;
  letter-spacing: -0.6px;
  margin: 0px;
`;

export const CollectionSubTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  color: rgb(62, 64, 66);
  line-height: 28px;
  letter-spacing: -0.3px;
  margin: 0px;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 54px;
`;

const Products: React.FC = () => (
  <>
    <CollectionHeader>
      <CollectionTitle>방 안에서 즐기는 봄 클래스</CollectionTitle>
      <CollectionSubTitle>사각사각 바느질부터 봄풍경 그리기 까지</CollectionSubTitle>
    </CollectionHeader>
    <Title>
      <h2>클래스 목록</h2>
      <div>평점순</div>
    </Title>
  </>
);

export default Products;
