import { CodeAction, Diagnostic } from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import {
  CompilerDiagnostic,
  HardhatCompilerError,
  ResolveActionsContext,
} from "../types";
import { attemptConstrainToFunctionName } from "../conversions/attemptConstrainToFunctionName";
import { ServerState } from "../../types";
import { resolveInsertSpecifierQuickFix } from "./common/resolveInsertSpecifierQuickFix";

export class AddVirtualSpecifier implements CompilerDiagnostic {
  public code = "4334";
  public blocks: string[] = [];

  public fromHardhatCompilerError(
    document: TextDocument,
    error: HardhatCompilerError
  ): Diagnostic {
    return attemptConstrainToFunctionName(document, error);
  }

  public resolveActions(
    serverState: ServerState,
    diagnostic: Diagnostic,
    context: ResolveActionsContext
  ): CodeAction[] {
    return resolveInsertSpecifierQuickFix(
      "virtual",
      diagnostic,
      context,
      serverState.logger
    );
  }
}
