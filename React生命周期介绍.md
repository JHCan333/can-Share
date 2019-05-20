# React生命周期介绍

## 1.生命周期总览
1. render()
2. constructor()
3. componentDidMount()
4. componentDidUpdate()
5. componentWillUnmount()
6. shouldComponentUpdate()
7. static getDerivedStateFromProps()
8. getSnapshotBeforeUpdate()
9.  static getDerivedStateFromError()
10. componentDidCatch()
11.  UNSAFE_componentWillMount()
12.  UNSAFE_componentWillReceiveProps()
13.  UNSAFE_componentWillUpdate()
## 2. React在各个操作中所执行的生命周期顺序：

### 2.1 挂载：
当组件实例被创建并且插入DOM中时，其生命周期调用顺序如下：
1. constructor()
2. static getDerivedStateFromProps() 
3. render() 
4. componentDidMount()

`注意:`
下述生命周期方法即将过时，在新代码中应该避免使用它们：
+ UNSAFE_componentWillMount()

### 2.2 更新：
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

`注意:`
下述方法即将过时，在新代码中应该避免使用它们：
+ UNSAFE_componentWillUpdate()
+ UNSAFE_componentWillReceiveProps()


### 2.3 卸载
当组件从 DOM 中移除时会调用如下方法：
+ componentWillUnmount()

### 2.4 错误处理
当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：
1. static getDerivedStateFromError()
2. componentDidCatch()

## 3.React常用生命周期介绍

### 3.1 render()
```JavaScript
render(){}
```
render() 方法是 class 组件中唯一必须实现的方法。
当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：
+ React 元素。通常通过 JSX 创建。例如，<div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件，无论是 <div /> 还是 <MyComponent /> 均为 React 元素。
+ 数组或 fragments。 使得 render 方法可以返回多个元素。
+ Portals。可以渲染子节点到不同的 DOM 子树中。
+ 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
+ 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && <Child /> 的模式，其中 test 为布尔类型。)

render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

如需与浏览器进行交互，请在 componentDidMount() 或其他生命周期方法中执行你的操作。保持 render() 为纯函数，可以使组件更容易思考。

```JavaScript
注意：如果 shouldComponentUpdate() 返回 false，则不会调用 render()。
```

### 3.2 constructor()
```JavaScript
constructor(props){}
```
如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。

在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。

通常，在 React 中，构造函数仅用于以下两种情况：
1. 通过给 this.state 赋值对象来初始化内部 state。
2. 为事件处理函数绑定实例
 
在 constructor() 函数中不要调用 setState() 方法。如果你的组件需要使用内部 state，请直接在构造函数中为 this.state 赋值初始 state：
```JavaScript
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
只能在构造函数中直接为 this.state 赋值。如需在其他方法中赋值，你应使用 this.setState() 替代。
要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 componentDidMount 中。

```JavaScript
注意：
避免将 props 的值复制给 state！这是一个常见的错误：
constructor(props) {
 super(props);
 // 不要这样做
 this.state = { color: props.color };
}
```

如此做毫无必要（你可以直接使用 this.props.color），同时还产生了 bug（更新 prop 中的 color 时，并不会影响 state）。

### 3.3 componentDidMount()
```JavaScript
componentDidMount()
```
componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅

你可以在 componentDidMount() 里可以直接调用 setState()。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。通常，你应该在 constructor() 中初始化 state。如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理

### 3.4 componentDidUpdate()
```JavaScript
componentDidUpdate(prevProps, prevState, snapshot)
```
componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。
当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）。
```JavaScript
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语件里，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。不要将 props “镜像”给 state，请考虑直接使用 props。

如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。
```JavaScript
注意：如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。
```
### 3.5 componentWillUnmount()
```JavaScript
componentWillUnmount()
```
componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。
componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

## 4.React不常用生命周期介绍

### 4.1 shouldComponentUpdate()
```JavaScript
shouldComponentUpdate(nextProps, nextState)
```
根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。
当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。

此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 PureComponent 组件，而不是手动编写shouldComponentUpdate()。

PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。
如果你一定要手动编写此函数，可以将 this.props 与 nextProps 以及 this.state 与nextState 进行比较，并返回 false 以告知 React 可以跳过更新。请注意，返回 false 并不会阻止子组件在 state 更改时重新渲染。

我们不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。
目前，如果 shouldComponentUpdate() 返回 false，则不会调用 UNSAFE_componentWillUpdate()，render() 和 componentDidUpdate()。后续版本，React 可能会将 shouldComponentUpdate 视为提示而不是严格的指令，并且，当返回 false 时，仍可能导致组件重新渲染。

### 4.2 static getDerivedStateFromProps()
```JavaScript
static getDerivedStateFromProps(props, state)
```
getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。例如，实现 <Transition> 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。

派生状态会导致代码冗余，并使组件难以维护。 确保你已熟悉这些简单的替代方案：
如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 componentDidUpdate。

1. 如果只想在 prop 更改时重新计算某些数据
2. 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控代替。

此方法无权访问组件实例。如果你需要，可以通过提取组件 props 的纯函数及 class 之外的状态，在getDerivedStateFromProps()和其他 class 方法之间重用代码。
请注意，不管原因是什么，都会在每次渲染前触发此方法。这与 UNSAFE_componentWillReceiveProps 形成对比，后者仅在父组件重新渲染时触发，而不是在内部调用 setState 时。

### 4.3 getSnapshotBeforeUpdate()
```JavaScript
getSnapshotBeforeUpdate(prevProps, prevState)
```
getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。

此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。
应返回 snapshot 的值（或 null）。

例如：

```
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ？
    // 捕获滚动​​位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
} 
```

在上述示例中，重点是从 getSnapshotBeforeUpdate 读取 scrollHeight 属性，因为 “render” 阶段生命周期（如 render）和 “commit” 阶段生命周期（如 getSnapshotBeforeUpdate 和 componentDidUpdate）之间可能存在延迟。

### 4.4 static getDerivedStateFromError()
```JavaScript
static getDerivedStateFromError(error)
```

此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state

``` 
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级  UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```  
```JavaScript
注意：getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()。
```

### 4.5 componentDidCatch()
```JavaScript
componentDidCatch(error, info)
```
此生命周期在后代组件抛出错误后被调用。 它接收两个参数：
1. error —— 抛出的错误。
2. info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。
componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况：
```JavaScript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // "组件堆栈" 例子:
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```
```JavaScript
注意：如果发生错误，你可以通过调用 setState 使用 componentDidCatch() 渲染降级 UI，但在未来的版本中将不推荐这样做。 可以使用静态 getDerivedStateFromError() 来处理降级	渲染。
```
## 5. 过时的生命周期方法
以下生命周期方法标记为“过时”。这些方法仍然有效，但不建议在新代码中使用它们。

### 5.1 UNSAFE_componentWillMount()
```JavaScript
UNSAFE_componentWillMount()
```
注意：
此生命周期之前名为 componentWillMount。该名称将继续使用至 React 17。可以使用 rename-unsafe-lifecycles codemod 自动更新你的组件。

UNSAFE_componentWillMount() 在挂载之前被调用。它在 render() 之前调用，因此在此方法中同步调用 setState() 不会触发额外渲染。通常，我们建议使用 constructor() 来初始化 state。
避免在此方法中引入任何副作用或订阅。如遇此种情况，请改用 componentDidMount()。
此方法是服务端渲染唯一会调用的生命周期函数。

### 5.2 UNSAFE_componentWillReceiveProps()
```JavaScript
UNSAFE_componentWillReceiveProps(nextProps)
```
注意：
此生命周期之前名为 componentWillReceiveProps。该名称将继续使用至 React 17。可以使用 rename-unsafe-lifecycles codemod 自动更新你的组件。

UNSAFE_componentWillReceiveProps() 会在已挂载的组件接收新的 props 之前被调用。如果你需要更新状态以响应 prop 更改（例如，重置它），你可以比较 this.props 和 nextProps 并在此方法中使用 this.setState() 执行 state 转换。
请注意，如果父组件导致组件重新渲染，即使 props 没有更改，也会调用此方法。如果只想处理更改，请确保进行当前值与变更值的比较。

在挂载过程中，React 不会针对初始 props 调用 UNSAFE_componentWillReceiveProps()。组件只会在组件的 props 更新时调用此方法。调用 this.setState() 通常不会触发 UNSAFE_componentWillReceiveProps()。

### 5.3 UNSAFE_componentWillUpdate()
```JavaScript
UNSAFE_componentWillUpdate(nextProps, nextState)
```
注意：
此生命周期之前名为 componentWillUpdate。该名称将继续使用至 React 17。可以使用 rename-unsafe-lifecycles codemod 自动更新你的组件。
当组件收到新的 props 或 state 时，会在渲染之前调用 UNSAFE_componentWillUpdate()。使用此作为在更新发生之前执行准备更新的机会。初始渲染不会调用此方法。

注意，你不能此方法中调用 this.setState()；在 UNSAFE_componentWillUpdate() 返回之前，你也不应该执行任何其他操作（例如，dispatch Redux 的 action）触发对 React 组件的更新

通常，此方法可以替换为 componentDidUpdate()。如果你在此方法中读取 DOM 信息（例如，为了保存滚动位置），则可以将此逻辑移至 getSnapshotBeforeUpdate() 中。
```JavaScript
注意：如果 shouldComponentUpdate() 返回 false，则不会调用 UNSAFE_componentWillUpdate()。
```
