const template = `
<nav>
  <ul class="navigation-list">
    {{#each links}}
      <li>
        {{{ this }}}
      </li>
    {{/each}}
  </ul>
</nav>
`;

export default template;
