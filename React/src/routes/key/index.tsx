import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ChacteristicBoxKey from "../../components/ChacteristicBoxKey";
import KeyButton from "../../components/KeyButton";
import KeyCards from "../../components/KeyCards";
import TermBoxKey from "../../components/TermBoxKey";
import TraitBoxKey from "../../components/TraitBoxKey";
import { passingCharacteristics } from "../../lib/characteristiclabels";
import { terms } from "../../lib/termlabels";
import { passingTraits } from "../../lib/traitslabels";
import MainPageTitle from "../../subcomponents/MainPageTitle";

export const Route = createFileRoute("/key/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedButton, setSelectedButton] = useState<number>(0);

  return (
    <>
      <div className="animate-fade-in-down bg-primary pb-10">
        <MainPageTitle title="Key" />

        <div className="max-w-7xl mx-auto space-x-6 my-6">
          {["Passing", "Rushing", "Receiving", "Blocking"].map(
            (title, index) => (
              <KeyButton
                key={index}
                title={title}
                selected={selectedButton === index}
                onClick={() => setSelectedButton(index)}
              />
            )
          )}
        </div>
        <div className="max-w-7xl mx-auto bg-white rounded-md shadow-surround py-8 mb-10">
          <KeyCards title={"Characteristics"}>
            {passingCharacteristics.map((characteristic, index) => (
              <ChacteristicBoxKey
                key={index}
                title={characteristic.label}
                description={characteristic.description}
              />
            ))}
          </KeyCards>
          <div className="mt-12"></div> {/* Added spacing between components */}
          <KeyCards title={"Traits"}>
            {passingTraits.map((characteristic, index) => (
              <TraitBoxKey
                key={index}
                title={characteristic.label}
                description={characteristic.description}
              />
            ))}
          </KeyCards>
        </div>
        <div className="max-w-7xl mx-auto bg-white rounded-md shadow-surround py-8">
          <KeyCards title={"Key Terms"}>
            {terms.map((characteristic, index) => (
              <TermBoxKey
                key={index}
                title={characteristic.label}
                description={characteristic.description}
                image={characteristic.image}
              />
            ))}
          </KeyCards>
        </div>
      </div>
    </>
  );
}
