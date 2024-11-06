import { LocalTime } from "@js-joda/core";
import { FitResult } from "../../types";
import { parseTimeString } from "../../utils";

export class BaseFee {
  startTime: LocalTime;
  endTime: LocalTime;
  constructor(startTime: string, endTime: string) {
    this.startTime = parseTimeString(startTime);
    this.endTime = parseTimeString(endTime);
  }

  isFit = (startTime: LocalTime, endTime: LocalTime): FitResult => {
    // task #2
    if (endTime.isBefore(this.startTime) || startTime.isAfter(this.endTime)) {
      return { isFit: false };
    }

    const adjustedStartTime = startTime.isBefore(this.startTime) ? this.startTime : startTime;
    const adjustedEndTime = endTime.isAfter(this.endTime) ? this.endTime : endTime;
    return { isFit: true, startTime: adjustedStartTime, endTime: adjustedEndTime };
  };

  calculateCost = (fit: FitResult): number => {
    throw new Error("Method not implemented.");
  };
}
