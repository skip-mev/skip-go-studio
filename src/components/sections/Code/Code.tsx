import { useState } from "react";
import { motion } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useChainIdsToAffiliates } from "@/hooks/useChainIdsToAffiliates";
import { useWidgetFilters } from "@/hooks/useWidgetFilters";
import { useStudioStore } from "@/store/studio";
import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/plugins/babel";
import pluginEstree from "prettier/plugins/estree";

import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "@/components/icons/ChevronDown";
import { cn } from "@/utils/ui";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid";

function stringifyWithUndefined(obj: Record<string, string[] | undefined>) {
  const entries = Object.entries(obj).map(([key, value]) => {
    const val = value === undefined ? "undefined" : JSON.stringify(value);
    return `"${key}": ${val}`;
  });
  return `{\n  ${entries.join(",\n  ")}\n}`;
}

export const Code = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    theme,
    defaultRoute,
    swapVenues,
    bridges,
    erc20UnlimitedApproval,
    defaultMaxSlippage,
    allowMultiTx,
    backgroundColor,
  } = useStudioStore();
  const saveBackgroundColor = debounce((color: string) => {
    useStudioStore.setState({
      backgroundColor: color,
    });
  }, 200);

  const [copied, setCopied] = useState(false);

  const filters = useWidgetFilters();
  const chainIdsToAffiliates = useChainIdsToAffiliates();
  const code = useQuery({
    queryKey: [
      allowMultiTx,
      bridges,
      chainIdsToAffiliates,
      defaultMaxSlippage,
      defaultRoute,
      erc20UnlimitedApproval,
      filters,
      swapVenues,
      theme,
    ],
    enabled: true,
    queryFn: async () => {
      try {
        return await prettier.format(
          `<Widget
              theme={${JSON.stringify(theme, null, 4)}}
              defaultRoute={${JSON.stringify(defaultRoute, null, 4)}}
              filter={{
                source: ${stringifyWithUndefined(filters.filter.source || {})},
                destination:  ${stringifyWithUndefined(
                  filters.filter.destination || {}
                )},
              }}
              filterOut={{
                source: ${stringifyWithUndefined(
                  filters.filterOut.source || {}
                )},
                destination:  ${stringifyWithUndefined(
                  filters.filterOut.destination || {}
                )},
              }}
              routeConfig={${JSON.stringify(
                {
                  swapVenues,
                  bridges,
                  allowMultiTx,
                },
                null,
                4
              )}}
              settings={{
                "slippage": ${
                  Number(defaultMaxSlippage) <= 0
                    ? 1
                    : Number(defaultMaxSlippage)
                }n,
                useUnlimitedApproval: ${erc20UnlimitedApproval}
              }}
              chainIdsToAffiliates={${JSON.stringify(chainIdsToAffiliates)}}
  />`,
          {
            parser: "babel",
            plugins: [parserBabel, pluginEstree],
            semi: true,
            singleQuote: true,
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <motion.div
      className="w-full absolute z-40 right-6 pr-0 gap-0 pl-6 p-6"
      style={{
        borderRadius: theme.borderRadius?.main,
      }}
      animate={{
        bottom: isOpen ? -30 : -300, // 6 * 4 = 24px for bottom-6
      }}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative w-full h-9">
        <div className="absolute left-0 top-0">
          <div className="bg-black h-9 px-4 rounded-tr-2xl gap-2 rounded-tl-2xl flex items-center justify-center">
            <div
              className="h-6 w-6 cursor-pointer overflow-hidden rounded-full border border-zinc-600"
              style={{
                backgroundColor,
              }}
            >
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => saveBackgroundColor(e.target.value)}
                className="cursor-pointer border-none opacity-0 outline-none"
                style={{
                  backgroundColor: backgroundColor,
                }}
              />
            </div>
            <span>Background</span>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-black h-9 w-15 rounded-tr-2xl rounded-tl-2xl flex items-center justify-center"
          >
            <ChevronDownIcon className={cn(!isOpen && "rotate-180")} />
          </button>
        </div>

        <div className="absolute right-0 top-0">
          <button
            onClick={() => {
              navigator.clipboard.writeText(code.data || "");
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
            className="bg-black h-9 px-4 rounded-tr-2xl gap-2 rounded-tl-2xl flex items-center justify-center"
          >
            <span>{copied ? "Copied" : "Copy to clipboard"}</span>
            {copied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <ClipboardDocumentIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language="jsx"
        wrapLines
        showLineNumbers
        style={{
          'code[class*="language-"]': {
            color: "#f8f8f2",
            background: "none",
            fontFamily: "ABCDiatypeMono, sans-serif",
            textAlign: "left",
            whiteSpace: "pre",
            wordSpacing: "normal",
            wordBreak: "normal",
            wordWrap: "normal",
            lineHeight: "1.5",
            MozTabSize: "4",
            OTabSize: "4",
            tabSize: "4",
            WebkitHyphens: "none",
            MozHyphens: "none",
            msHyphens: "none",
            hyphens: "none",
          },
          'pre[class*="language-"]': {
            color: "#f8f8f2",
            background: "#2b2b2b",
            fontFamily: "ABCDiatypeMono, sans-serif",
            textAlign: "left",
            whiteSpace: "pre",
            wordSpacing: "normal",
            wordBreak: "normal",
            wordWrap: "normal",
            lineHeight: "1.5",
            MozTabSize: "4",
            OTabSize: "4",
            tabSize: "4",
            WebkitHyphens: "none",
            MozHyphens: "none",
            msHyphens: "none",
            hyphens: "none",
            padding: "1em",
            margin: "0.5em 0",
            overflow: "auto",
            borderRadius: "0.3em",
          },
          ':not(pre) > code[class*="language-"]': {
            background: "#2b2b2b",
            padding: "0.1em",
            borderRadius: "0.3em",
            whiteSpace: "normal",
          },
          comment: {
            color: "#d4d0ab",
          },
          prolog: {
            color: "#d4d0ab",
          },
          doctype: {
            color: "#d4d0ab",
          },
          cdata: {
            color: "#d4d0ab",
          },
          punctuation: {
            color: "#fefefe",
          },
          property: {
            color: "#ffa07a",
          },
          tag: {
            color: "#ffa07a",
          },
          constant: {
            color: "#ffa07a",
          },
          symbol: {
            color: "#ffa07a",
          },
          deleted: {
            color: "#ffa07a",
          },
          boolean: {
            color: "#00e0e0",
          },
          number: {
            color: "#00e0e0",
          },
          selector: {
            color: "#abe338",
          },
          "attr-name": {
            color: "#abe338",
          },
          string: {
            color: "#abe338",
          },
          char: {
            color: "#abe338",
          },
          builtin: {
            color: "#abe338",
          },
          inserted: {
            color: "#abe338",
          },
          operator: {
            color: "#00e0e0",
          },
          entity: {
            color: "#00e0e0",
            cursor: "help",
          },
          url: {
            color: "#00e0e0",
          },
          ".language-css .token.string": {
            color: "#00e0e0",
          },
          ".style .token.string": {
            color: "#00e0e0",
          },
          variable: {
            color: "#00e0e0",
          },
          atrule: {
            color: "#ffd700",
          },
          "attr-value": {
            color: "#ffd700",
          },
          function: {
            color: "#ffd700",
          },
          keyword: {
            color: "#00e0e0",
          },
          regex: {
            color: "#ffd700",
          },
          important: {
            color: "#ffd700",
            fontWeight: "bold",
          },
          bold: {
            fontWeight: "bold",
          },
          italic: {
            fontStyle: "italic",
          },
        }}
        customStyle={{
          marginTop: 0,
          backgroundColor: "black",
          borderRadius: 0,
          height: "400px", // 80px for the header and controls
          overflow: "auto",
          paddingLeft: 4,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          letterSpacing: 0.2,
        }}
      >
        {code.data || ""}
      </SyntaxHighlighter>
    </motion.div>
  );
};
