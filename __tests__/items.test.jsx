import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Items from "../pages/items/index";
import { getServerSideProps } from "../pages/items/index";

const mockPushFn = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockPushFn,
    query: {},
    beforePopState: jest.requireActual("next/router"),
  })),
}));

const items = [
  {
    id: "id1",
    title: "product1",
    price: {
      currency: "ars",
      amount: 1234,
    },
    picture: "/test/img1.png",
    condition: "new",
    address: "Rosario",
    freeShipping: true,
    shipping: { free_shipping: true },
  },
  {
    id: "id2",
    title: "product2",
    price: {
      currency: "ars",
      amount: 2345,
    },
    picture: "/test/img2.png",
    condition: "new",
    freeShipping: false,
    shipping: { free_shipping: false },
    address: "Salta",
  },
  {
    id: "id3",
    title: "product3",
    price: {
      currency: "ars",
      amount: 5678,
    },
    picture: "/test/img3.png",
    condition: "new",
    freeShipping: false,
    shipping: { free_shipping: false },
    address: "Chubut",
  },
];

const categories = ["category1", "category2", "category3"];

jest.mock("../services/ApiService", () => ({
  get: () => ({
    data: {
      results: items,
      filters: [
        {
          id: "category",
          values: [
            {
              path_from_root: [
                { name: categories[0] },
                { name: categories[1] },
                { name: categories[2] },
              ],
            },
          ],
        },
      ],
    },
  }),
}));

describe("Items page", () => {
  const ctx = {
    query: { search: "ipad" },
  };

  it("renders not found items message", () => {
    render(<Items items={[]} categories={[]} />);

    const notFoundMessage = screen.getByText("No se encontraron resultados");

    expect(notFoundMessage).toBeInTheDocument();
  });

  it("renders item cards", () => {
    render(<Items items={items} categories={categories} />);

    const firstProduct = screen.getByText("product1");
    const secondProduct = screen.getByText("product1");
    const thirdProduct = screen.getByText("product1");

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
    expect(thirdProduct).toBeInTheDocument();
  });

  it("should fetch data", async () => {
    const response = await getServerSideProps(ctx);

    expect(response.props.items.length).toBe(3);
    expect(response.props.categories.length).toBe(3);
  });

  it("should redirect to home if search value is empty", async () => {
    const response = await getServerSideProps({
      query: { search: "" },
    });

    expect(response).toStrictEqual({
      redirect: { destination: "/", permanent: false },
    });
  });

  it("should redirect to item detail if you click on item title", async () => {
    render(<Items items={items} categories={categories} />);

    const productTitle = screen.getByRole("heading", { name: "product1" });
    fireEvent.click(productTitle);

    expect(mockPushFn).toHaveBeenCalledWith("/items/id1");
  });
});
