import { useState } from "react";
import { motion } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useChainIdsToAffiliates } from "@/hooks/useChainIdsToAffiliates";
import { useWidgetFilters } from "@/hooks/useWidgetFilters";
import { useStudioStore } from "@/store/studio";
import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/plugins/babel";
import pluginEstree from "prettier/plugins/estree";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "@/components/icons/ChevronDown";
import { cn } from "@/utils/ui";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid";

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
    borderRadius,
  } = useStudioStore();

  const [copied, setCopied] = useState(false);

  const filters = useWidgetFilters();
  const chainIdsToAffiliates = useChainIdsToAffiliates();
  console.log();
  const code = useQuery({
    queryKey: [
      allowMultiTx,
      bridges,
      chainIdsToAffiliates,
      defaultMaxSlippage,
      defaultRoute,
      erc20UnlimitedApproval,
      filters.filter,
      filters.filterOut,
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
  filter={${JSON.stringify(filters.filter, null, 4)}}
filterOut={${JSON.stringify(filters.filterOut, null, 4)}}
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
      Number(defaultMaxSlippage) <= 0 ? 1 : Number(defaultMaxSlippage)
    }n,
    useUnlimitedApproval: ${erc20UnlimitedApproval}
  }}

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
        borderRadius,
      }}
      animate={{
        bottom: isOpen ? 24 : -500, // 6 * 4 = 24px for bottom-6
      }}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative w-full h-9">
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
        style={a11yDark}
        customStyle={{
          marginTop: 0,
          backgroundColor: "black",
          borderRadius,
          height: 600,
          overflow: "auto",
          paddingLeft: 4,
          borderTopRightRadius: 0,
        }}
        c
      >
        {code.data || ""}
      </SyntaxHighlighter>
    </motion.div>
  );
};
