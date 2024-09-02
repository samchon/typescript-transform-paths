import TS from "typescript";
import { TsTransformPathsContext } from "../types";
import { TsFourSeven, TsThreeEight } from "./versions";

export interface HarmonyFactory extends TS.NodeFactory {}

/** Creates a node factory compatible with TS v3+ */
export function createHarmonyFactory(context: TsTransformPathsContext): HarmonyFactory {
  return new Proxy((context.tsFactory ?? context.tsInstance) as TS.NodeFactory, {
    get(target, prop: keyof TS.NodeFactory) {
      if (TsThreeEight.predicate(context)) {
        return TsThreeEight.handler(context, prop);
      } else if (TsFourSeven.predicate(context)) {
        return TsFourSeven.handler(context, prop);
      } else {
        return target[prop];
      }
    },
  }) as HarmonyFactory;
}
