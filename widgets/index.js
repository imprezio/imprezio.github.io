const handleWidget = async (element, graphQLURL, widgetId) => {
  const response = await fetch(
    `${graphQLURL}?query=query%20Widgets%20%7B%0A%20%20paginatedReadWidgets(limit%3A%2025,%20offset%3A%200,%20ID%3A%20${widgetId})%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20ID%0A%09%09%09%09Title%0A%09%09%09%09Javascript%0A%09%09%09%09CSS%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20hasPreviousPage%0A%20%20%20%20%20%20totalCount%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`
  );
  const {
    data: {
      paginatedReadWidgets: { edges },
    },
  } = await response.json();
  if (!edges[0]) {
    throw new Error(`Widget ${widgetId} not found.`);
  }
  const {
    node: { Javascript, CSS },
  } = edges[0];

  const css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", CSS);
  element.appendChild(css);

  const script = document.createElement("script");
  script.setAttribute("src", Javascript);
  element.appendChild(script);
};

[...document.getElementsByClassName("op-widget")].forEach((element) => {
  const graphqlURL = element.getAttribute("data-graphql-url");
  const widgetID = element.getAttribute("data-widget-id");
  handleWidget(element, graphqlURL, widgetID);
});
