import React from "react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button, KIND, SHAPE } from "baseui/button";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import { Accordion, Panel } from "baseui/accordion";
import { Slider } from "baseui/slider";
import "./App.css";
import { FormControl } from "baseui/form-control";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";

function App() {
  const [css, theme] = useStyletron();

  const [password, setPassword] = React.useState<string>("");
  const passwordRef = React.useRef(null);

  const [length, setLength] = React.useState<number[]>([10]);
  const [capitalAllowed, setCapitalAllowed] = React.useState<boolean>(false);
  const [numberAllowed, setNumberAllowed] = React.useState<boolean>(false);
  const [symbolAllowed, setSymbolAllowed] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  // GENERATE PASSWORD
  const generatePassword = () => {
    const passwordLength: number = length[0];

    let stringSet: string = "abcdefghijklmnopqrstuvwxyz";
    if (capitalAllowed) stringSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) stringSet += "0123456789";
    if (symbolAllowed) stringSet += `!"#$%&\:;<=>?@'({|}~)*+,-[\\]^_./`;

    let tempPassword: string = "";
    for (let i = 0; i < passwordLength; i++) {
      const charIndex: number = Math.floor(Math.random() * stringSet.length);
      tempPassword += stringSet[charIndex];
    }
    setPassword(tempPassword);
    setCopied(false);
  };

  React.useEffect(() => {
    generatePassword();
  }, [capitalAllowed, numberAllowed, symbolAllowed, length]);

  return (
    <>
      <Card
        overrides={{
          Root: {
            style: {
              maxWidth: "400px",
              position: "absolute",
              top: "20px",
              right: "50%",
              transform: "translate(50%, 0)",
              width: "95%",
              backgroundColor: "#121212",
              border: "none",
            },
          },
        }}
      >
        <StyledBody>
          <Input
            value={password}
            ref={passwordRef}
            onChange={(event) => setPassword(event.target.value)}
            overrides={{
              Root: {
                style: {
                  backgroundColor: "#121212",
                },
              },
              Input: {
                style: {
                  color: "white",
                  backgroundColor: "#121212",
                  fontWeight: "bold",
                  fontSize: "20px",
                  letterSpacing: "1px",
                },
              },
              InputContainer: {
                style: {
                  color: "white",
                  backgroundColor: "#121212",
                  fontWeight: "bold",
                  fontSize: "20px",
                  letterSpacing: "1px",
                },
              },
              After: () => (
                <Button shape={SHAPE.square} onClick={generatePassword}>
                  <svg
                    className={css({
                      height: theme.sizing.scale800,
                      width: theme.sizing.scale800,
                    })}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#aaaaaa"
                      d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
                    />
                  </svg>
                </Button>
              ),
            }}
          />
        </StyledBody>

        <StyledAction>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopied(true);
            }}
            overrides={{
              BaseButton: {
                style: {
                  backgroundColor: "limegreen",
                  width: "100%",
                  marginBottom: "10px",
                  ":hover": {
                    backgroundColor: "green",
                  },
                },
              },
            }}
            disabled={password === ""}
          >
            {copied ? "COPIED" : "COPY"}
          </Button>
        </StyledAction>
        {/* #6943ff */}
        <Accordion
          accordion
          overrides={{
            Root: {
              style: {
                borderRadius: "1em",
                overflow: "hidden",
                backgroundColor: "#dbdbdb",
              },
            },
            Content: {
              style: {
                backgroundColor: "#dbdbdb",
              },
            },
            Header: {
              style: {
                borderRadius: "1em",
                backgroundColor: "#dbdbdb",
                color: "blue",
              },
            },
          }}
        >
          <Panel title="Options">
            <FormControl label="Length">
              <Slider
                value={length}
                onChange={({ value }) => setLength(value)}
                min={0}
                max={20}
              />
            </FormControl>

            <Checkbox
              checked={capitalAllowed}
              onChange={(e) => setCapitalAllowed(e.target.checked)}
              labelPlacement={LABEL_PLACEMENT.right}
            >
              A-Z
            </Checkbox>

            <Checkbox
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              labelPlacement={LABEL_PLACEMENT.right}
            >
              0-9
            </Checkbox>
            <Checkbox
              checked={symbolAllowed}
              onChange={(e) => setSymbolAllowed(e.target.checked)}
              labelPlacement={LABEL_PLACEMENT.right}
            >
              %$#
            </Checkbox>
          </Panel>
        </Accordion>
      </Card>
    </>
  );
}

export default App;
