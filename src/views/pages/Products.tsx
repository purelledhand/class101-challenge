import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Product from 'views/common/Product';
import Pagination from '@material-ui/lab/Pagination';
import productItems from 'utils/productItems';

export const CollectionHeader = styled.div`
  width: 100%;
  height: 192px;
  display: flex;
  flex-direction: column;
  padding-top: 72px;
  box-sizing: border-box;
  margin-bottom: 20px;
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
  margin-bottom: 24px;
`;

export const ProductsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 24px;

  &>div {
    margin-right: 22px;
  }
  &>div:nth-child(5n) {
    margin-right: 0;
  }
`;

/*
 * NOTE: 프로덕트 렌더링 방식 및 state management strategy
 * 서버로부터 받은 데이터를 모두 클라이언트로 가져 온 다음, 컴포넌트 상태에 저장
 * 가져 온 데이터를 5개씩 쪼개서 페이지네이션과 함께 렌더링.
 * 더 효율적인 방법이 있는지 검토 필요함
*/
const renderProduct = (products: Array<Product>):Array<JSX.Element> => products.map((item) => {
  const {
    id, title, coverImage, price, score,
  } = item;

  return (
    <Product
      key={id}
      title={title}
      coverImage={coverImage}
      price={price}
      score={score}
    />
  );
});

/*
 * NOTE: Pagination Strategy
 * 1. 프로덕트 리스트 개수로부터 총 페이지 계산 후 넘김
 * 2. 페이지 버튼 누르면 현재 페이지 상태 업데이트 (changePaged에서 setRenderedProducts 트리거)
 * 3. renderedProducts 상태 업데이트
*/

/* NOTE: amountPage 생각해 볼 거리
 * 한 상품페이지에서 받아오는 productItems 배열이 바뀔 수 있는지?
 * 바뀌지 않는다면/바뀐다면 useEffect(fn, [productItems])로 amountPage를 업데이트 해줄 필요가 있을지
 * 그런식으로 관리한다면 컴포넌트 내에 productItems 배열을 state로 가져와야 한다는 단점이 있음 (상태가 많아짐)
*/

/*
 * NOTE: Products Component State
 * 1. renderedProducts: 페이지네이션을 통해 페이지에서 렌더링할 프로덕트 리스트
 * 2. productPage: 현재 프로덕트 페이지
 */
// TODO: ProductsList 태그 내에서는 렌더링할 프로덕트 리스트를.

interface Product {
  id: string
  title: string
  coverImage: string
  price: number
  score: number
  availableCoupon?: boolean
}

const Products: React.FC = () => {
  const defaultPage = 1;
  const [renderedProducts, setRenderedProducts] = useState<Array<Product>>([]);
  const [productPage, setProductPage] = useState<number>(defaultPage);
  // TODO: mount시 useEffect에서 길이 못받아오는 issue 핸들링
  const amountPage = Math.ceil(productItems.length / 5);

  function changeProductPage(page: number) {
    setProductPage(page);
    setRenderedProducts(productItems.slice((page - 1) * 5, page * 5));
  }

  // TODO: renaming function
  const changeProductPageEvent = (e: React.ChangeEvent<unknown>, page: number): void => {
    changeProductPage(page);
  };

  useEffect(() => {
    changeProductPage(defaultPage);
  }, []);

  return (
    <>
      <CollectionHeader>
        <CollectionTitle>방 안에서 즐기는 봄 클래스</CollectionTitle>
        <CollectionSubTitle>사각사각 바느질부터 봄풍경 그리기 까지</CollectionSubTitle>
      </CollectionHeader>
      <Title>
        <h2>클래스 목록</h2>
        <div>평점순</div>
      </Title>
      <ProductsList>
        {renderProduct(renderedProducts)}
      </ProductsList>
      <Pagination count={amountPage} page={productPage} onChange={changeProductPageEvent} />
    </>
  );
};

export default Products;
