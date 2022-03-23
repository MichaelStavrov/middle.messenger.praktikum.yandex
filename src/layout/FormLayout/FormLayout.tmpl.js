const template = `
    <form class="form">
      <h1 class="form-title">
        {{ title }}
      </h1>
      <fieldset class="fieldset">
        {{#each fields}}
          {{{ this }}}
        {{/each}}
      </fieldset>
      <div class="controls">
        {{#each controls}}
          {{{ this }}}
        {{/each}}
      </div>
    </form>
`;

export default template;
