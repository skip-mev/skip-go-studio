import { useStudioStore } from "@/store/studio";
import { ColorSelectionButton } from "./ColorSelectionButton";
import { FilterButton } from "@/components/SmallPillButton";
import { defaultTheme, lightTheme } from "@skip-go/widget";
import { BorderRadiusInput } from "./BorderRadiusInput";

export const ColorSelection = () => {
  const { theme } = useStudioStore();
  console.log("theme", theme);
  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-row gap-2">
        <FilterButton
          onClick={() => {
            useStudioStore.setState((prev) => ({
              theme: { ...defaultTheme, borderRadius: prev.theme.borderRadius },
              backgroundColor: "#000000",
            }));
          }}
        >
          Load dark theme
        </FilterButton>
        <FilterButton
          onClick={() => {
            useStudioStore.setState((prev) => ({
              theme: { ...lightTheme, borderRadius: prev.theme.borderRadius },
              backgroundColor: "#c7c7c7",
            }));
          }}
        >
          Load light theme
        </FilterButton>
        <FilterButton
          onClick={() => {
            useStudioStore.setState((prev) => ({
              theme: {
                brandColor: "#88c070",
                borderRadius: prev.theme.borderRadius,
                primary: {
                  background: {
                    normal: "#f2efe4",
                  },
                  text: {
                    normal: "#2c2c2c",
                    lowContrast: "#2c2c2c99",
                    ultraLowContrast: "#2c2c2c55",
                  },
                  ghostButtonHover: "#88c07044",
                },
                secondary: {
                  background: {
                    normal: "#d8ccb4",
                    transparent: "#d8ccb4cc",
                    hover: "#b8a88e",
                  },
                },
                success: {
                  text: "#6cae4e",
                },
                warning: {
                  background: "#f6e7b0",
                  text: "#c2842d",
                },
                error: {
                  background: "#e8b0a4",
                  text: "#a23c3c",
                },
              },
              backgroundColor: "#d7d5d1",
            }));
          }}
        >
          Load ghibli theme
        </FilterButton>
      </div>
      <ColorSelectionButton
        title="Brand"
        value={theme.brandColor}
        onSave={(color) => {
          useStudioStore.setState({
            theme: {
              ...theme,
              brandColor: color,
            },
          });
        }}
      />
      <ColorSelectionButton
        title="Brand text"
        value={theme.brandTextColor || "#FFFFFF"}
        onSave={(color) => {
          useStudioStore.setState({
            theme: {
              ...theme,
              brandTextColor: color,
            },
          });
        }}
      />
      <span className="text-xl">Primary</span>
      <div className="flex flex-col gap-4 pl-4">
        <ColorSelectionButton
          title="Background"
          value={theme.primary.background.normal}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  background: {
                    ...theme.primary.background,
                    normal: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text normal"
          value={theme.primary.text.normal}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  text: {
                    ...theme.primary.text,
                    normal: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text low contrast"
          value={theme.primary.text.lowContrast}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  text: {
                    ...theme.primary.text,
                    lowContrast: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text ultra low contrast"
          value={theme.primary.text.ultraLowContrast}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  text: {
                    ...theme.primary.text,
                    ultraLowContrast: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Ghost button hover"
          value={theme.primary.ghostButtonHover}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                primary: {
                  ...theme.primary,
                  ghostButtonHover: color,
                },
              },
            });
          }}
        />
      </div>
      <span className="text-xl">Secondary</span>
      <div className="flex flex-col gap-4 pl-4">
        <ColorSelectionButton
          title="Background normal"
          value={theme.secondary.background.normal}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                secondary: {
                  ...theme.secondary,
                  background: {
                    ...theme.secondary.background,
                    normal: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Background hover"
          value={theme.secondary.background.hover}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                secondary: {
                  ...theme.secondary,
                  background: {
                    ...theme.secondary.background,
                    hover: color,
                  },
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Background transparent"
          value={theme.secondary.background.transparent}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                secondary: {
                  ...theme.secondary,
                  background: {
                    ...theme.secondary.background,
                    transparent: color,
                  },
                },
              },
            });
          }}
        />
      </div>
      <span className="text-xl">Error</span>
      <div className="flex flex-col gap-4 pl-4">
        <ColorSelectionButton
          title="Background"
          value={theme.error.background}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                error: {
                  ...theme.error,
                  background: color,
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text"
          value={theme.error.text}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                error: {
                  ...theme.error,
                  text: color,
                },
              },
            });
          }}
        />
      </div>
      <span className="text-xl">Warning</span>
      <div className="flex flex-col gap-4 pl-4">
        <ColorSelectionButton
          title="Background"
          value={theme.warning.background}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                warning: {
                  ...theme.warning,
                  background: color,
                },
              },
            });
          }}
        />
        <ColorSelectionButton
          title="Text"
          value={theme.warning.text}
          onSave={(color) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                warning: {
                  ...theme.warning,
                  text: color,
                },
              },
            });
          }}
        />
      </div>
      <ColorSelectionButton
        title="Success text"
        value={theme.success.text}
        onSave={(color) => {
          useStudioStore.setState({
            theme: {
              ...theme,
              success: {
                text: color,
              },
            },
          });
        }}
      />
      <span className="text-xl mt-2">Border radius</span>
      <div className="flex flex-col gap-4 pl-4">
        <BorderRadiusInput
          title="Main container"
          value={theme.borderRadius?.mainContainer}
          onSave={(size) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                borderRadius: {
                  ...theme.borderRadius,
                  mainContainer: `${String(size)}px`,
                },
              },
            });
          }}
        />
        <BorderRadiusInput
          title="Modal container"
          value={theme.borderRadius?.modalContainer}
          onSave={(size) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                borderRadius: {
                  ...theme.borderRadius,
                  modalContainer: `${String(size)}px`,
                },
              },
            });
          }}
        />
        <BorderRadiusInput
          title="Main button"
          value={theme.borderRadius?.mainButton}
          onSave={(size) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                borderRadius: {
                  ...theme.borderRadius,
                  mainButton: `${String(size)}px`,
                },
              },
            });
          }}
        />
        <BorderRadiusInput
          title="Selection button"
          value={theme.borderRadius?.selectionButton}
          onSave={(size) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                borderRadius: {
                  ...theme.borderRadius,
                  selectionButton: `${String(size)}px`,
                },
              },
            });
          }}
        />
        <BorderRadiusInput
          title="Ghost button"
          value={theme.borderRadius?.ghostButton}
          onSave={(size) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                borderRadius: {
                  ...theme.borderRadius,
                  ghostButton: `${String(size)}px`,
                },
              },
            });
          }}
        />
        <BorderRadiusInput
          title="Row item"
          value={theme.borderRadius?.rowItem}
          onSave={(size) => {
            useStudioStore.setState({
              theme: {
                ...theme,
                borderRadius: {
                  ...theme.borderRadius,
                  rowItem: `${String(size)}px`,
                },
              },
            });
          }}
        />
      </div>
    </div>
  );
};
