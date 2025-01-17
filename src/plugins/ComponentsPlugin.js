export const ComponentsPlugin = (system) => {
    return {
      statePlugins: {
        spec: {
          selectors: {
            getUIComponents: (state) => {
              const spec = state.get("json", {}).toJS();
              return Object.entries(spec?.components?.schemas || {})
                .filter(([key]) => key.startsWith("UI."))
                .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
            }
          }
        }
      },
      components: {
        UIComponents: ({ getComponent }) => {
          const uiComponents = system.getSystem().specSelectors.getUIComponents();
          const [expandedComponent, setExpandedComponent] = system.React.useState(null);
          // Add state for header expansion
        const [isHeaderExpanded, setIsHeaderExpanded] = system.React.useState(true);
  
          if (Object.keys(uiComponents).length === 0) return null;
  
          return system.React.createElement("section", {  className: `models${isHeaderExpanded ? ' is-open' : ''}` },
            // Header
            system.React.createElement("h4", {},
              system.React.createElement("button", {
                className: "models-control",
                "aria-expanded": isHeaderExpanded,
                onClick: () => setIsHeaderExpanded(!isHeaderExpanded)
                
              }, 
                system.React.createElement("span", {}, "UI Components - Custom UI Plugin that renders components"),
                system.React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", viewBox:"0 0 20 20", width: "20", height: "20", 'aria-hidden': true, focusable: false},
                  system.React.createElement("path", {d: `${isHeaderExpanded ? "M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z":"M 17.418 14.908 C 17.69 15.176 18.127 15.176 18.397 14.908 C 18.667 14.64 18.668 14.207 18.397 13.939 L 10.489 6.109 C 10.219 5.841 9.782 5.841 9.51 6.109 L 1.602 13.939 C 1.332 14.207 1.332 14.64 1.602 14.908 C 1.873 15.176 2.311 15.176 2.581 14.908 L 10 7.767 L 17.418 14.908 Z"}`})
                )
              )
            ),
            // Components List
            /* system.React.createElement("div", { className: "no-margin" },
              Object.entries(uiComponents).map(([name, schema]) =>
                system.React.createElement("div", { 
                  key: name, 
                  className: `model-container ${expandedComponent === name ? 'is-open' : ''}`
                },
                  // Component Header
                  system.React.createElement("span", { className: "model-box" },
                    system.React.createElement("button", {
                      className: "model-box-control",
                      "aria-expanded": expandedComponent === name,
                      onClick: () => setExpandedComponent(expandedComponent === name ? null : name)
                    },
                    system.React.createElement("span", { className: "model-title" }, name),
                      system.React.createElement("span", { className: "model-toggle collapsed" }),
                    )
                  ),
                  // Component Content
                  expandedComponent === name && system.React.createElement("div", { className: "model-box-container" },
                    // Description
                    schema.description && system.React.createElement("div", { className: "model-box" },
                      schema.description
                    ),
                    // Properties Table
                    system.React.createElement("span", {className:"inner-object"}, 
                      system.React.createElement("table", { className: "model model-box" },
                        system.React.createElement("thead", {},
                          system.React.createElement("tr", {},
                            system.React.createElement("th", { className: "prop-name" }, "Name"),
                            system.React.createElement("th", { className: "prop-type" }, "Type"),
                            system.React.createElement("th", { className: "prop-desc" }, "Description")
                          )
                        ),
                        system.React.createElement("tbody", {},
                          Object.entries(schema.properties || {}).map(([propName, prop]) =>
                            system.React.createElement("tr", { key: propName },
                              system.React.createElement("td", { className: "prop-name" }, propName),
                              system.React.createElement("td", { className: "prop-type" },
                                prop.type,
                                prop.enum && system.React.createElement("div", { className: "prop-enum" },
                                  "Enum: [",
                                  prop.enum.map((val, i) => 
                                    system.React.createElement("span", { key: val },
                                      `"${val}"${i < prop.enum.length - 1 ? ", " : ""}`
                                    )
                                  ),
                                  "]"
                                )
                              ),
                              system.React.createElement("td", { className: "prop-desc" }, prop.description)
                            )
                          )
                        )
                      ),
                    )
                    
                    // Example
                    schema.example && system.React.createElement("div", { className: "model-example" },
                      system.React.createElement("div", { className: "model-title" }, "Example"),
                      system.React.createElement("pre", {},
                        JSON.stringify(schema.example, null, 2)
                      )
                    )
                  )
                )
              )
            ) */
          );
        }
      },
      wrapComponents: {
        Models: (Original, { React }) => (props) => {
          const UIComponents = system.getComponent("UIComponents");
          return React.createElement("div", {},
            React.createElement(UIComponents),
            React.createElement(Original, props)
          );
        }
      }
    };
  };