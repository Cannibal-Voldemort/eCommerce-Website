import { filterOptions } from "@/config";
import { Label } from "@radix-ui/react-label";
import React, { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter() {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div>
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold ">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {
                    filterOptions[keyItem].map(option=><Label className="flex items-center gap-2 font-small">
                      <Checkbox/>
                      {option.label}
                    </Label>)
                }
                </div>
            </div>
            <Separator/>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
