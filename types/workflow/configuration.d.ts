interface WFGlobalConfig {
  canRemove: WFCanRemove;
  canAppend: WFCanAppend;
  canMove: WFCanMove;
  canDropped: WFCanDropped;
  removeValidator: WFExecutionValidator;
  completenessValidator: WFExecutionValidator;
  preBehaviorOfDelete: WFPreBehavior;
}

type WFGlobalConfigKey = keyof WFGlobalConfig;
