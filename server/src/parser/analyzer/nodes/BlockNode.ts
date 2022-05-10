import { Block, FinderType, DocumentsAnalyzerMap, Node } from "@common/types";

export class BlockNode extends Node {
  public astNode: Block;

  constructor(
    block: Block,
    uri: string,
    rootPath: string,
    documentsAnalyzer: DocumentsAnalyzerMap
  ) {
    super(block, uri, rootPath, documentsAnalyzer, undefined);
    this.astNode = block;
  }

  public getDefinitionNode(): Node | undefined {
    return undefined;
  }

  public accept(
    find: FinderType,
    orphanNodes: Node[],
    parent?: Node,
    expression?: Node
  ): Node {
    this.setExpressionNode(expression);

    for (const statement of this.astNode.statements) {
      find(statement, this.uri, this.rootPath, this.documentsAnalyzer).accept(
        find,
        orphanNodes,
        parent
      );
    }

    return this;
  }
}
