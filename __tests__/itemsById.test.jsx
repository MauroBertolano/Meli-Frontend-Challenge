import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Item from "../pages/items/[id]";
import { getServerSideProps } from "../pages/items/[id]";

const item = {
  id: "id1",
  title: "product1",
  price: {
    currency: "ars",
    amount: 1234,
  },
  picture: "/test/img1.png",
  condition: "new",
  address: "Rosario",
  shipping: { free_shipping: true },
  soldQuantity: 10,
  availableQuantity: 10,
};

const categories = ["category1", "category2", "category3"];

jest.mock("../services/ApiService", () => ({
  get: (url) => {
    switch (url) {
      case "/items/id1":
        return Promise.resolve({
          data: {
            ...item,
            attributes: [{ id: "ITEM_CONDITION", value_name: "new" }],
            category_id: "category1",
          },
        });
      case "/items/withoutCondition":
        return Promise.resolve({
          data: {
            ...item,
            condition: "new",
            attributes: [],
            category_id: "category1",
          },
        });
      case "/items/id1/description":
        return Promise.resolve({
          data: {
            plain_text: "description 1",
          },
        });
      case "/categories/category1":
        return Promise.resolve({
          data: {
            path_from_root: [
              { name: categories[0] },
              { name: categories[1] },
              { name: categories[2] },
            ],
          },
        });
      default:
        return { data: { error: "not found" } };
    }
  },
}));

describe("Items page", () => {
  const ctx = {
    query: { id: "id1" },
  };

  it("renders item details page", () => {
    render(<Item item={item} categories={categories} />);

    const productName = screen.getByText("product1");
    const buyBtn = screen.getByRole("button", /comprar/);

    expect(productName).toBeInTheDocument();
    expect(buyBtn).toBeInTheDocument();
  });

  it("button is disable when availableQuantity is zero", () => {
    render(
      <Item item={{ ...item, availableQuantity: 0 }} categories={categories} />
    );

    const buyBtn = screen.getByRole("button", /comprar/);

    expect(buyBtn).toHaveAttribute("disabled");
  });

  it("should fetch data", async () => {
    const response = await getServerSideProps(ctx);

    expect(response.props.item.id).toBe("id1");
    expect(response.props.categories.length).toBe(3);
  });

  it("should fetch data without condition attribute", async () => {
    const response = await getServerSideProps({
      query: { id: "withoutCondition" },
    });

    expect(response.props.item.id).toBe("id1");
    expect(response.props.categories.length).toBe(3);
  });

  it("should redirect to home if search value is empty", async () => {
    const response = await getServerSideProps({
      query: { id: "" },
    });

    expect(response).toStrictEqual({
      redirect: { destination: "/", permanent: false },
    });
  });

  it("should redirect to home item not found", async () => {
    const response = await getServerSideProps({
      query: { id: "notfound" },
    });

    expect(response).toStrictEqual({
      redirect: { destination: "/", permanent: false },
    });
  });
});
