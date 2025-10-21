export type PaginationParams = {
  page_size: number;
  page_number: number;
};

export type PaginationResponse = {
  totalNumberOfElements: number;
  currentPage: number;
  totalNumberOfPages: number;
};
