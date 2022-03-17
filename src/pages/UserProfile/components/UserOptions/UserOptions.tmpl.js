const template = `
  <ul class="user-options-list">
    {{#each options}}
      <li class="user-options-item">
        {{{ this }}}
      </li>
    {{/each}}
  </ul>
`;

export default template;
