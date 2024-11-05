const Pagination = ({ postsPerPage, totalPosts, paginate,activePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination flex flex-nowrap gap-4 cursor-pointer'>
        
        {pageNumbers.map(number => (
          <li key={number} className={'page-item bg-slate-200 rounded-2xl w-8 h-8 text-center p-1 font-semibold text-slate-900'+(activePage==number?'bg-slate-900 text-yellow-600':'')} >
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;