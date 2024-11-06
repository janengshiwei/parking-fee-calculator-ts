import { LocalTime } from "@js-joda/core";
import { FitResult } from "../../../types";
import { parseTimeString } from "../../../utils";
import { BaseFee } from "../BaseFee";

describe("BaseFee", () => {
  const configStartTime = "10:00";
  const configEndTime = "12:00";
  const feeRate = 5;
  const mockFitResult: FitResult = {
    startTime: parseTimeString(configStartTime),
    endTime: parseTimeString(configEndTime),
    isFit: true,
  };
  const baseFee = new BaseFee(configStartTime, configEndTime);
  describe("isFit", () => {
    it("should return true if the given start and end times are within the configured range", () => {
      const startTime = LocalTime.parse("10:30");
      const endTime = LocalTime.parse("11:30");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(true);
      expect(fitResult.startTime).toBe(startTime);
      expect(fitResult.endTime).toBe(endTime);
    });

    // task #2
    // TODO: implement more test cases for the isFit method
    it("should return true with the configured start time in the result if the given start time is before the configured " +
      "start time but the end time is within the configured range", () => {
      const startTime = LocalTime.parse("09:30");
      const endTime = LocalTime.parse("11:30");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(true);
      expect(fitResult.startTime).toBe(baseFee.startTime);
      expect(fitResult.endTime).toBe(endTime);
    });

    it("should return true with the configured end time in the result if the given end time is after the configured end time but the start time is within the configured range", () => {
      const startTime = LocalTime.parse("10:30");
      const endTime = LocalTime.parse("13:30");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(true);
      expect(fitResult.startTime).toBe(startTime);
      expect(fitResult.endTime).toBe(baseFee.endTime);
    });

    it("should return true if the given start and end times are more than the configured range", () => {
      const startTime = LocalTime.parse("09:30");
      const endTime = LocalTime.parse("13:30");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(true);
      expect(fitResult.startTime).toBe(baseFee.startTime);
      expect(fitResult.endTime).toBe(baseFee.endTime);
    });

    it("should return false with start and end time as undefined in result if the given time range is out of the configured range", () => {
      const startTime = LocalTime.parse("09:30");
      const endTime = LocalTime.parse("09:59");
      const fitResult = baseFee.isFit(startTime, endTime);
      expect(fitResult.isFit).toBe(false);
      expect(fitResult.startTime).toBeUndefined();
      expect(fitResult.endTime).toBeUndefined();
    });
  });

  describe("calculateCost", () => {
    it("should throw an error if not implemented", () => {
      expect(() => baseFee.calculateCost(mockFitResult)).toThrow(
        "Method not implemented."
      );
    });
  });
});
