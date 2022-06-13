import { GetServerSideProps } from "next";
import ItemCard from "../../components/itemCard/itemCard";
import ItemsLayout from "../../components/itemsLayout/itemsLayout";
import Breadcrumb from "../../components/shared/breadcrumb/breadcrumb";
import { ItemResponse, ItemsResponse } from "../../interfaces/ApiResponse";
import { Item } from "../../interfaces/Item";
import ApiService from "../../services/ApiService";

interface ItemsProps {
  items: Item[];
  categories: string[];
}

const Items: React.FC<ItemsProps> = ({ items, categories }: ItemsProps) => {
  if (items.length === 0) return <div>No se encontraron resultados</div>;
  return (
    <>
      <Breadcrumb categories={categories} />
      <ItemsLayout>
        {items.map((item: Item) => (
          <ItemCard key={`item-card-${item.id}`} item={item} />
        ))}
      </ItemsLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search } = context.query;

  if (!search) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data } = await ApiService.get<ItemsResponse>(
    `sites/MLA/search?q=${search}&limit=4`
  );

  const items = data.results.map(
    (item: ItemResponse): Item => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
      },
      picture: item.thumbnail,
      condition: item.condition,
      freeShipping: item.shipping.free_shipping,
      address: item.address.city_name,
    })
  );

  const category = data.filters.find((filters) => filters.id === "category");

  let categories: string[] = [];
  if (category)
    categories = category.values[0].path_from_root.map(
      (category) => category.name
    );

  const author = { name: "Mauro", lastName: "Bertolano" };

  return { props: { items, categories } };
};

export default Items;
