import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCES = [
  {
    id: 'p1',
    price: 6,
    title: 'book',
    description: 'this is a book',
  },
  {
    id: 'p2',
    price: 5,
    title: 'pizza',
    description: 'nice pizza',
  },
];

const Products = props => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCES.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
