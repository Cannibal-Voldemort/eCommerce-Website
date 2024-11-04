import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";

function AdminOrdersDetailsView() {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">OrderId</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">OrderId</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">OrderId</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">OrderId</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">OrderId</p>
            <Label>123456</Label>
          </div>
          <Separator/>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrdersDetailsView;
