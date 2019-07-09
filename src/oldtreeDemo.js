import {theme } from '/data.js'

const generateTreeFromTheme = theme => {
  //called with every property and its value

  const walk = (obj, parentPath) => {
    let listArray = [];
    Object.keys(obj).forEach(key => {
      let result =
        typeof obj[key] === "object"
          ? {
              title: key,
              disabled: true,
              key: parentPath + key,
              children: walk(obj[key], parentPath + key)
            }
          : {
              title: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ColorSwatch color={obj[key]} />
                  {key} ({obj[key]})
                </div>
              ),
              value: obj[key]
            };
      listArray.push(result);
    });
    return listArray;
  };

  //  const treeData = walk(theme)
  /* <TreeSelect
          showSearch
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          style={{ width: 300 }}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          treeData={'treeData'}
          onChange={this.onChange}
        /> */