import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { formatNumber } from "~/libs/helper";

interface NumberCountUpProps {
  value: number;
  prefix?: string;
  shortNumber?: boolean;
}

export const NumberCountUp = ({
  value,
  prefix,
  shortNumber,
}: NumberCountUpProps) => {
  const [clientSideValue, setClientSideValue] = useState<number | null>(null);

  useEffect(() => {
    setClientSideValue(value);
  }, [value]);

  return clientSideValue !== null ? (
    <CountUp
      end={clientSideValue}
      start={0}
      separator=","
      prefix={prefix}
      formattingFn={
        shortNumber ? (value) => formatNumber(value, prefix) : undefined
      }
    />
  ) : null;
};
