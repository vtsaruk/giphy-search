import { Pagination } from '@mui/material/';
import { useHistory } from "react-router-dom"

function PaginationComponent ({ count }) {
  const { location, push } = useHistory();
  const page = location.search
    .replace('?', '')
    .split('&')
    .filter(param => param.includes('page='))
    .map(result => result.split('=')[1] || 0)
    .join();
  
  const handleChangePage = (env, page) => {
    let urlParams = location.search.replace(/page\=[0-9]{0,}/, `page=${page}`)

    if (!urlParams.includes('page=')){
      urlParams = `${urlParams}&page=${page}`
    }

    const newUrl =  `${location.pathname}${urlParams}`
    push(newUrl);
  };

  return (
    <Pagination
      count={count}
      onChange={handleChangePage}
      variant="outlined"
      shape="rounded"
      defaultPage="0"
      page={page}
    />
  )
}

export default PaginationComponent;