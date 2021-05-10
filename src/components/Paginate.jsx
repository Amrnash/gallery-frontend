import React from "react";
import { Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const Paginate = ({ pages, page }) => {
  const history = useHistory();
  const handlePagination = (x) => {
    history.push(`/${x + 1}`);
  };
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            onClick={() => handlePagination(x)}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};
export default Paginate;
