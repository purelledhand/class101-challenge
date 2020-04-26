import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Header, Title, SubTitle } from 'views/layout/layoutStyles';
import Product from 'views/common/Product';
import Pagination from '@material-ui/lab/Pagination';
import productItems from 'utils/productItems';

/*
 * NOTE: Pagination Strategy
 * 1. 프로덕트 리스트 개수로부터 총 페이지 계산 후 넘김
 * 2. 페이지 버튼 누르면 현재 페이지 상태 업데이트 (changePaged에서 setRenderedProducts 트리거)
 * 3. renderedProducts 상태 업데이트
 * ISSUE: 페이지 바뀔때마다 cdn에서 이미지 가져와서 인터랙션이 안좋아짐
 * ISSUE: 이미 방문했던 페이지 이미지도 다시 cdn에서 받아옴 (캐싱 도입?)
 * ISSUE: 리렌더링 시 cdn에서 original 이미지 다시 불러오는 문제
 * Request URL: https://cdn.class101.net/images/a363a069-5aaf-40cb-822e-a2cab585c37e/original
 * cdn에 original로 붙어서 요청감 -> DOM에서 이미지 잡아놔야함
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
// index를 별도로 저장해서 isInCart 값 바꿀때 인덱스값으로 검사해서 O(1)이 되도록 하는 방식에 반례는 없을지? 정당할지
interface Product {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
}

interface CartProduct {
  id: string;
  title: string;
  price: number;
  availableCoupon?: boolean;
}

const Products: React.FC = () => {
  const defaultPage = 1;
  const sortedProductItems = productItems.sort((a, b) => b.score - a.score);
  // TODO: global state로 빼주기. 지금은 액션처리용도로만 사용
  // cart: 장바구니 페이지에 넘길 데이터({id, title, price, availableCoupon})
  // array of product index : 검색 시간복잡도 O(1)
  const [renderedProducts, setRenderedProducts] = useState<Array<Product>>([]);
  const [productPage, setProductPage] = useState<number>(defaultPage);
  const intl = useIntl();

  const endPage = Math.ceil(productItems.length / 5);

  // TODO: renaming function
  const changeProductPageEvent = (e: React.ChangeEvent<unknown>, page: number): void => {
    setProductPage(page);
    setRenderedProducts(sortedProductItems.slice((page - 1) * 5, page * 5));
  };

  useEffect(() => {
    setRenderedProducts(sortedProductItems.slice((defaultPage - 1) * 5, defaultPage * 5));
  }, [sortedProductItems]);

  /*
   * NOTE: 프로덕트 렌더링 방식 및 state management strategy
   * 서버로부터 받은 데이터를 모두 클라이언트로 가져 온 다음, 컴포넌트 상태에 저장
   * 가져 온 데이터를 5개씩 쪼개서 페이지네이션과 함께 렌더링.
   * 더 효율적인 방법이 있는지 검토 필요함
   */
  function renderProduct(products: Array<Product>) {
    return products.map((item: Product) => {
      const { id, title, coverImage, price, score, availableCoupon } = item;

      return (
        <Product
          key={id}
          id={id}
          title={title}
          coverImage={coverImage}
          price={price}
          score={score}
          availableCoupon={availableCoupon}
        />
      );
    });
  }

  return (
    <>
      <Header>
        <Title>
          {intl.formatMessage({ id: 'PAGE_TITLE_PRODUCTS' })}
        </Title>
        <SubTitle>
          {intl.formatMessage({ id: 'PAGE_SUBTITLE_PRODUCTS' })}
        </SubTitle>
      </Header>
      <ProductListHeader>
        <h2>
          {intl.formatMessage({ id: 'CLASS_LIST' })}
        </h2>
        <div>
          {intl.formatMessage({ id: 'ORDER_BY_SCORE' })}
        </div>
      </ProductListHeader>
      <ProductsList>
        {renderProduct(renderedProducts)}
      </ProductsList>
      <Pagination count={endPage} page={productPage} onChange={changeProductPageEvent} />
    </>
  );
};

export const ProductListHeader = styled.div`
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

  & > div {
    margin-right: 22px;
  }
  & > div:nth-child(5n) {
    margin-right: 0;
  }
`;

export default Products;
