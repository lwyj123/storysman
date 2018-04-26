export type ScopedSlot = (props: any) => VNodeChildrenArrayContents | string;

export type VNodeChildren = VNodeChildrenArrayContents | [ScopedSlot] | string;
export interface VNodeChildrenArrayContents extends Array<VNode | string | VNodeChildrenArrayContents> {}

export default class VNode {
    tag: string | void;
    data: VNodeData | void;
    children: ?Array<VNode>;
    text: string | void;
    elm: Node | void;
    ns: string | void;
    context: Component | void; // rendered in this component's scope
    key: string | number | void;
    componentOptions: VNodeComponentOptions | void;
    componentInstance: Component | void; // component instance
    parent: VNode | void; // component placeholder node
  
    // strictly internal
    raw: boolean; // contains raw HTML? (server only)
    isStatic: boolean; // hoisted static node
    isRootInsert: boolean; // necessary for enter transition check
    isComment: boolean; // empty comment placeholder?
    isCloned: boolean; // is a cloned node?
    isOnce: boolean; // is a v-once node?
    asyncFactory: Function | void; // async component factory function
    asyncMeta: Object | void;
    isAsyncPlaceholder: boolean;
    ssrContext: Object | void;
    fnContext: Component | void; // real context vm for functional nodes
    fnOptions: ?ComponentOptions; // for SSR caching
    fnScopeId: ?string; // functional scope id support
  
    constructor (
      tag?: string,
      data?: VNodeData,
      children?: ?Array<VNode>,
      text?: string,
      elm?: Node,
      context?: Component,
      componentOptions?: VNodeComponentOptions,
      asyncFactory?: Function
    ) {
      this.tag = tag
      this.data = data
      this.children = children
      this.text = text
      this.elm = elm
      this.ns = undefined
      this.context = context
      this.fnContext = undefined
      this.fnOptions = undefined
      this.fnScopeId = undefined
      this.key = data && data.key
      this.componentOptions = componentOptions
      this.componentInstance = undefined
      this.parent = undefined
      this.raw = false
      this.isStatic = false
      this.isRootInsert = true
      this.isComment = false
      this.isCloned = false
      this.isOnce = false
      this.asyncFactory = asyncFactory
      this.asyncMeta = undefined
      this.isAsyncPlaceholder = false
    }
  
    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    get child (): Component | void {
      return this.componentInstance
    }
  }
  
  export const createEmptyVNode = (text: string = '') => {
    const node = new VNode()
    node.text = text
    node.isComment = true
    return node
  }
  
  export function createTextVNode (val: string | number) {
    return new VNode(undefined, undefined, undefined, String(val))
  }
  
  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  export function cloneVNode (vnode: VNode): VNode {
    const cloned = new VNode(
      vnode.tag,
      vnode.data,
      vnode.children,
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.fnContext = vnode.fnContext
    cloned.fnOptions = vnode.fnOptions
    cloned.fnScopeId = vnode.fnScopeId
    cloned.asyncMeta = vnode.asyncMeta
    cloned.isCloned = true
    return cloned
  }
  

  export interface VNodeComponentOptions {
    Ctor: typeof Vue;
    propsData?: object;
    listeners?: object;
    children?: VNodeChildren;
    tag?: string;
  }
  
  export interface VNodeData {
    key?: string | number;
    slot?: string;
    scopedSlots?: { [key: string]: ScopedSlot };
    ref?: string;
    tag?: string;
    staticClass?: string;
    class?: any;
    staticStyle?: { [key: string]: any };
    style?: object[] | object;
    props?: { [key: string]: any };
    attrs?: { [key: string]: any };
    domProps?: { [key: string]: any };
    hook?: { [key: string]: Function };
    on?: { [key: string]: Function | Function[] };
    nativeOn?: { [key: string]: Function | Function[] };
    transition?: object;
    show?: boolean;
    inlineTemplate?: {
      render: Function;
      staticRenderFns: Function[];
    };
    directives?: VNodeDirective[];
    keepAlive?: boolean;
  }
  
  export interface VNodeDirective {
    readonly name: string;
    readonly value: any;
    readonly oldValue: any;
    readonly expression: any;
    readonly arg: string;
    readonly modifiers: { [key: string]: boolean };
  }