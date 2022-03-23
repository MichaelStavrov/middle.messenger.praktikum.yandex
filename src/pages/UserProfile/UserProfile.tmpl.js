const template = `
  <div class="user-profile">
    <div class="user-profile-container">
      <a class="user-profile-link-to-back" href={{ href }}>
        <img class="user-profile-icon-back" src={{ icon }} alt="вернуться назад"/>
      </a>
      {{{ avatar }}}
      {{{ info }}}
      {{{ options }}}
    </div>
  </div>
`;

export default template;
