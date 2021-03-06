import { GetServerSideProps } from "next";
import ItemDetails from "../../components/itemDetails/itemDetails";
import ItemsLayout from "../../components/itemsLayout/itemsLayout";
import Breadcrumb from "../../components/shared/breadcrumb/breadcrumb";
import { CategoriesResponse, ItemResponse } from "../../interfaces/ApiResponse";
import { Item } from "../../interfaces/Item";
import ApiService from "../../services/ApiService";

interface ItemDetailsProps {
  item: ItemDetails;
  categories: string[];
}

const ItemDetailsPage: React.FC<ItemDetailsProps> = ({ item, categories }) => {
  return (
    <>
      <Breadcrumb categories={categories} />
      <ItemsLayout>
        <ItemDetails item={item} />
      </ItemsLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: itemResponse } = await ApiService.get<ItemResponse>(
    `/items/${id}`
  );

  if ("error" in itemResponse) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { data: itemDescriptionResponse } = await ApiService.get(
    `/items/${id}/description`
  );
  const { data: itemCategories } = await ApiService.get<CategoriesResponse>(
    `/categories/${itemResponse.category_id}`
  );

  const item: Item = {
    id: itemResponse.id,
    title: itemResponse.title,
    price: {
      currency: itemResponse.currency_id,
      amount: itemResponse.price,
    },
    picture: itemResponse.thumbnail,
    condition:
      itemResponse.attributes.find(
        (attribute) => attribute.id === "ITEM_CONDITION"
      )?.value_name ?? itemResponse.condition,
    freeShipping: itemResponse.shipping.free_shipping,
    soldQuantity: itemResponse.sold_quantity,
    availableQuantity: itemResponse.available_quantity,
    description: itemDescriptionResponse.plain_text,
  };

  let categories: string[] = [];
  if (itemCategories)
    categories = itemCategories.path_from_root.map((category) => category.name);

  const author = { name: "Mauro", lastName: "Bertolano" };

  return { props: { item, categories } };
};

export default ItemDetailsPage;
