/*
 * Original code from:
*
 * k-d Tree JavaScript - V 1.01
*
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 * 
 * And then modified a bit by https://github.com/mljs/knn/blob/master/src/KDTree.js
 */

import { BinaryHeap } from "./binary_heap";

class Node {
  obj: number[];
  dimension: number;
  parent: Node | undefined;
  left: Node | null;
  right: Node | null;

  constructor(obj: number[], dimension: number, parent?: Node) {
    this.obj = obj;
    this.dimension = dimension;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

export default class KDTree {
  dimensions: number[];
  root: Node;
  metric: (p: any, q: any) => number;

  constructor(points: number[][], metric: (p: any, q: any) => number) {
    this.dimensions = points[0].map((point, index) => index);
    this.root = buildTree(points, 0, null, this.dimensions);
    this.metric = metric;
  }

  nearest(point: number[], maxNodes: number): { point: number[], distance: number }[] {
    const metric = this.metric;
    const dimensions = this.dimensions;
    const bestNodes = new BinaryHeap((e) => -e[1]);

    function nearestSearch(node: Node) {
      const dimension = dimensions[node.dimension];
      const ownDistance = metric(point, node.obj);
      const linearPoint = {};
      let bestChild: Node;
      let otherChild: Node;

      function saveNode(node: Node, distance: number) {
        bestNodes.push([node, distance]);
        if (bestNodes.size() > maxNodes) {
          bestNodes.pop();
        }
      }

      for (let i = 0; i < dimensions.length; i += 1) {
        if (i === node.dimension) {
          linearPoint[dimensions[i]] = point[dimensions[i]];
        } else {
          linearPoint[dimensions[i]] = node.obj[dimensions[i]];
        }
      }

      const linearDistance = metric(linearPoint, node.obj);

      if (node.right === null && node.left === null) {
        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }
        return;
      }

      if (node.right === null) {
        bestChild = node.left;
      } else if (node.left === null) {
        bestChild = node.right;
      } else {
        if (point[dimension] < node.obj[dimension]) {
          bestChild = node.left;
        } else {
          bestChild = node.right;
        }
      }

      nearestSearch(bestChild);

      if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
        saveNode(node, ownDistance);
      }

      if (
        bestNodes.size() < maxNodes ||
        Math.abs(linearDistance) < bestNodes.peek()[1]
      ) {
        if (bestChild === node.left) {
          otherChild = node.right;
        } else {
          otherChild = node.left;
        }
        if (otherChild !== null) {
          nearestSearch(otherChild);
        }
      }
    }

    if (this.root) {
      nearestSearch(this.root);
    }

    const result: { point: number[], distance: number }[] = [];
    for (let i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
      if (bestNodes.content[i][0]) {
        const node = bestNodes.content[i][0];
        const point = node.obj as number[];
        const distance = bestNodes.content[i][1] as number;
        result.push({ point, distance });
      }
    }
    return result;
  }
}

function buildTree(points: number[][], depth: number, parent: Node, dimensions: number[]): Node {
  const dim = depth % dimensions.length;

  if (points.length === 0) {
    return null;
  }
  if (points.length === 1) {
    return new Node(points[0], dim, parent);
  }

  points.sort((a, b) => a[dimensions[dim]] - b[dimensions[dim]]);

  const median = Math.floor(points.length / 2);
  const node = new Node(points[median], dim, parent);
  node.left = buildTree(points.slice(0, median), depth + 1, node, dimensions);
  node.right = buildTree(points.slice(median + 1), depth + 1, node, dimensions);

  return node;
}

