import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Header, Title, SubTitle } from 'views/layout/layoutStyles';
import Product from 'views/common/Product';
import Pagination from '@material-ui/lab/Pagination';
import productItems from 'rawdata/productItems';

/*
 * NOTE: Pagination Strategy
 * ISSUE: 페이지 바뀔때마다 cdn에서 이미지 가져와서 인터랙션이 안좋아짐
 * ISSUE: 이미 방문했던 페이지 이미지도 다시 cdn에서 받아옴 (캐싱 도입?)
 * ISSUE: 리렌더링 시 cdn에서 original 이미지 다시 불러오는 문제
 * Request URL: https://cdn.class101.net/images/a363a069-5aaf-40cb-822e-a2cab585c37e/original
 * cdn에 original로 붙어서 요청감 -> DOM에서 이미지 잡아놔야함
 */

interface Product {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
}

const Products: React.FC = () => {
  const defaultPage = 1;
  const sortedProductItems = productItems.sort((a, b) => b.score - a.score);
  // array of product index : 검색 시간복잡도 O(1)
  const [renderedProducts, setRenderedProducts] = useState<Array<Product>>([]);
  const [productPage, setProductPage] = useState<number>(defaultPage);
  const intl = useIntl();

  const endPage = Math.ceil(productItems.length / 5);

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
