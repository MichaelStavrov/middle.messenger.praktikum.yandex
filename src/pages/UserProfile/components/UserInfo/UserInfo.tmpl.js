const template = `
  <ul class="user-info-list">
    {{#each userInfoRows}}
      <li class="user-info-item">
        <span class="user-info-label">{{ label }}</span>
        <span class="user-info-value">{{ value }}</span>
      </li>
    {{/each}}
  </ul>
`;
export default template;
