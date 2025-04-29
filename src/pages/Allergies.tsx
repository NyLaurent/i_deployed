import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample allergy data
const ALLERGY_RECORDS = [
  {
    id: 1,
    date: "Monday, 27 March 2023",
    facility: "Healthy Family Center",
    type: "Allergies",
  },
  {
    id: 2,
    date: "Monday, 27 March 2023",
    facility: "Healthy Family Center",
    type: "Allergies",
  },
];

const TOTAL_RECORDS = {
  antibiotics: { count: 2, severity: "Severe" },
  antiseptics: { count: 0, severity: "Mild" },
};

const AllergiesContent = ({ onBack }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">Allergies</h1>
          </div>
          <div className="relative w-72">
            <Input
              type="text"
              placeholder="Search your report"
              className="pl-4 pr-10 py-2 w-full rounded-full border bg-white"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {ALLERGY_RECORDS.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-lg p-4 shadow-sm border"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{record.date}</p>
                  <p className="text-sm text-gray-500">{record.facility}</p>
                  <p className="text-sm text-gray-500">{record.type}</p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    View Insights
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Delete Record
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    Add Allergy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Records */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h2 className="font-medium mb-4">Total Records</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Antibiotics</p>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {TOTAL_RECORDS.antibiotics.count}
                </span>
                <span className="text-sm text-red-600">
                  {TOTAL_RECORDS.antibiotics.severity}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Antiseptics</p>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {TOTAL_RECORDS.antiseptics.count}
                </span>
                <span className="text-sm text-yellow-600">
                  {TOTAL_RECORDS.antiseptics.severity}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Allergy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllergiesContent;
