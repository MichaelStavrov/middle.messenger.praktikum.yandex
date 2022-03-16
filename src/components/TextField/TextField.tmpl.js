const template = `
  <div class="text-field">
  {{#if label}}
    <label
      class="text-field-label"
      {{#if id}}
        for={{ id }}
      {{/if}}
    >
      {{ label }}
    </label>
  {{/if}}
    {{#input}}{{/input}}
  </div>
`;

export default template;
