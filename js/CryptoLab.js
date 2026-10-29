(() => {
  const $ = (id) => document.getElementById(id);

  const sectionNames = [
    'Ledger basics',
    'Digital signatures',
    'Decentralization',
    'Mining & hashes',
    'Chain challenge',
    'Wrap-up'
  ];

  const slides = [
    { section: 0, title: 'A ledger is a shared record', lead: 'Imagine a notebook that records who paid whom.', body: `<p>A <strong>ledger</strong> is a record of transactions. For example, it might say that Alice paid Bob $3.</p><div class="callout"><strong>Try it:</strong> If Alice pays Bob $3, what information should a ledger record?</div><div class="interactive-row"><button class="demo-button" data-demo="transaction">Add an example transaction</button></div><div id="ledgerDemo" class="callout" hidden></div>` },
    { section: 0, title: 'A ledger alone is not enough', lead: 'A useful payment system needs rules.', body: `<p>If anyone can write anything in the notebook, someone could invent a payment or change an old one. Suddenly, Alice has to pay Bob $1,000,000!</p><ul><li>Which payments can happen?</li><li>How can people check who paid the money?</li><li>How does everyone agree on the right ledger?</li></ul><div class="callout warning">A cryptocurrency is not just any ledger. It uses cryptographic techniques - turning words into puzzles or codes - to confirm and write down transfers of a cryptocurrency.</div>` },
    { section: 1, title: 'Digital signatures: showing real transactions', lead: 'A signature helps show that a message was approved by the person giving money.', body: `<p>In a public-key system, each user has a <strong>private key</strong> they keep secret like a password and a <strong>public key</strong> others can use like a username to make sure it is true.</p><div class="interactive-row"><button class="demo-button" data-demo="sign">Make a signature</button><button class="demo-button" data-demo="change">Change the message</button></div><div id="signatureDemo" class="callout" aria-live="polite">Choose “Make a signature” to see the idea.</div><p class="fine-print">In real cryptocurrency, Alice uses her private key (password) to digitally sign a transaction saying she wants to send Bob 3 LD. The network uses Alice’s public key (username) to check that the signature is correct and that the transaction has not been changed. If it is changed, then the signature is wrong and it makes sure Alice does not give more money than she wants to. If the transaction also follows the rules, such as Alice having enough money, it can be written into the cryptocurrency ledger.</p>` },
    { section: 1, title: 'Rules give the currency meaning', lead: 'The system must decide what counts as a correct transfer.', body: `<p>Let's pretend our <strong>LD (Ledger Dollars)</strong> is a new currency and everyone starts with a set amount. Everyone using LD cannot spend more than they have.</p><ul><li>A transaction says who is sending money and who is getting money.</li><li>The system checks that the transaction follows its rules.</li><li>Accepted transactions that have correct signatures update how much LD everyone has.</li></ul><div class="callout">Real cryptocurrencies have different rules. Some, like Bitcoin, use mining to add new blocks, while others use different ways to connect all the transactions.</div>` },
    { section: 2, title: 'Why keep copies?', lead: 'A <strong>centralized</strong> system depends on one person (the Boss) writing everything down. But if the Boss loses it, nobody knows how much money they have. A <strong>decentralized</strong> system does not depend on just one keeper.', body: `<p>Pretend several people are keeping copies of the ledger. When someone wants to make a transaction, everyone can check it against the rules.</p><div class="interactive-row"><button class="demo-button" data-demo="copies">Send a transaction to 3 copies</button></div><div id="copiesDemo" class="callout" aria-live="polite">Three copies are waiting for a transaction.</div><p>Decentralization comes in levels: real networks are different in who can have a copy, how old versions are checked, and how people agree.</p>` },
    { section: 2, title: 'How can everyone agree?', lead: 'Copies need a way to decide which one is the right one so they are all the same.', body: `<p>People using LD follow the same rules to confirm transactions and they decide which version is correct.<br>What if someone secretly changes a transaction in their copy? How can everyone spot the change and work out which copies to trust?</p><div class="interactive-row"><button class="demo-button" data-demo="tamperCopy">Change one copy</button></div><div id="copiesDemo" class="callout" aria-live="polite"><strong>Copy A ✓</strong> Alice pays Bob 3 LD<br><strong>Copy B ✓</strong> Alice pays Bob 3 LD<br><strong>Copy C ✓</strong> Alice pays Bob 3 LD</div>` },
    { section: 3, title: 'A hash is a digital fingerprint', lead: 'A cryptographic hash turns a message to a code word that works like a fingerprint.', body: `<p>The same message gives the same fingerprint, and a small change will create a very different fingerprint.</p><div class="interactive-row"><button class="demo-button" data-demo="hash">Create a hash</button><button class="demo-button" data-demo="hashChange">Change the message</button></div><div id="hashDemo" class="callout" aria-live="polite">Try the buttons to compare fingerprints.</div><p class="fine-print">A hash is not a secret code you can solve. It helps us see if the message was changed. A digital signature helps us check whether a transaction was approved by someone with their private key (password).<br><strong>A hash checks the messages - a signature helps prove who wrote and sent it.</strong></p>` },
    { section: 3, title: 'Proof-of-work: search, then verify', lead: 'Some networks make adding a block require computer and math work.', body: `<p>In Bitcoin proof-of-work, miners try different codes at the top of a block (including something called a <strong>nonce</strong>) until the resulting hash (fingerprint) meets a rule. Finding the right answer for the rule can take lots of tries, but checking whether an answer is correct is very quick.</p><ul><li><strong>Search:</strong> try many codes.</li><li><strong>Target:</strong> the answer must satisfy a rule like starting with 00.</li><li><strong>Verify:</strong> other people can check the answer to see if it follows the rule.</li></ul><button class="button" data-jump="miningLab" type="button">Try mining puzzle ↓</button>` },
    { section: 4, title: "What's Inside a Block?", lead: "Think of a block as a tiny part in a giant ledger online. Each block stores transaction information about who is paying who and connects to the block before it.", body: `<div class="lesson-block-diagram"><div class="lesson-block-heading"><span>BLOCK #2</span><span class="lesson-block-tag">Connected</span></div><div class="lesson-block-part"><div class="lesson-block-part-title"><span class="lesson-part-number">1</span><strong>Previous Block's Hash</strong></div><p>The digital fingerprint of the block before this one.</p><div class="lesson-example-hash">0a37f81c</div></div><div class="lesson-block-part"><div class="lesson-block-part-title"><span class="lesson-part-number">2</span><strong>Transactions</strong></div><p>Keeping track of money moving between people.</p><div class="lesson-example-transactions"><div>Alice pays Bob 3 LD</div><div>Bob pays Chen 1 LD</div></div></div><div class="lesson-block-part"><div class="lesson-block-part-title"><span class="lesson-part-number">3</span><strong>This Block's Hash</strong></div><p>The block's own digital fingerprint, calculated using its contents (1 and 2) and a nonce.</p><div class="lesson-example-hash lesson-valid-hash">00b492e1</div></div></div><div class="callout"><strong>Remember:</strong> A nonce is the number miners try changing to find a hash that follows the rule. You practiced this in the mining puzzle by guessing nonces!</div>` },
    { section: 4, title: 'Blocks link together to make a blockchain', lead: 'Each block uses the last block’s hash (fingerprint).', body: `<p>When these blocks are connected by fingerprints, it is called a <strong>blockchain</strong>.</p><ul><li>When a block also uses the last block’s hash, changing earlier transactions changes that earlier block’s hash.</li><li>Then, the next block’s saved information then does not match, and it makes a domino effect because the mismatch continues down the chain.</li></ul><div class="callout">Become a crypto miner and build your own blockchain!</div><button class="button" id="startChainGame" type="button">Go to the chain challenge ↓</button>` },
    {
      section: 5,
      title: "Putting It All Together",
      lead: "You've learned how cryptocurrency transactions become part of a blockchain. But how can that system function as money?",

      body: `
    <div class="lesson-summary">

      <h3>What You've Learned</h3>

      <div class="lesson-summary-grid">

        <div class="lesson-summary-item">
          <div class="lesson-summary-icon">↔</div>
          <strong>Transactions</strong>
          <p>
            People send and receive cryptocurrency,
            following the rules.
          </p>
        </div>

        <div class="lesson-summary-item">
          <div class="lesson-summary-icon">▣</div>
          <strong>Blocks</strong>
          <p>
            Transactions are recorded in blocks
            that contain information and hashes.
          </p>
        </div>

        <div class="lesson-summary-item">
          <div class="lesson-summary-icon">#</div>
          <strong>Hashes</strong>
          <p>
            Digital fingerprints that is different for every message and help show
            when someone changes information.
          </p>
        </div>

        <div class="lesson-summary-item">
          <div class="lesson-summary-icon">⚒</div>
          <strong>Mining</strong>
          <p>
            In some systems, miners search
            for a hash that meets a target, like starting with 0s.
          </p>
        </div>

      </div>

      <div class="lesson-summary-chain">

        <h3>And Together, They Form a Blockchain</h3>

        <div class="lesson-mini-chain">
          <div>Block 1</div>
          <span>→</span>
          <div>Block 2</div>
          <span>→</span>
          <div>Block 3</div>
          <span>→</span>
          <div>Block 4</div>
        </div>

        <p>
          Each block uses the last block's
          hash. Changing earlier history means you have to
          re-mining the blocks after it.
        </p>

      </div>

      <div class="lesson-currency-transition">
        <span>BLOCKCHAIN</span>
        <span class="lesson-transition-arrow">→</span>
        <span>CURRENCY</span>
      </div>

      <h3>What Would Make Cryptocurrency Useful Like Dollars?</h3>

      <p>
        Cryptocurrency can already be used to transfer
        money. When you buy something, some block would say what you pay the store. But becoming money that people use
        every day is more than cool technology.
      </p>

      <div class="lesson-summary-grid">

        <div class="lesson-summary-item">
          <div class="lesson-summary-icon">▤</div>
          <strong>Acceptance</strong>
          <p>
            People and businesses must be willing
            to accept it as payment. Have you ever seen a sign in a store that says we take Bitcoin?
          </p>
        </div>

        <div class="lesson-summary-item">
          <div class="lesson-summary-icon">✓</div>
          <strong>Trust &amp; Security</strong>
          <p>
            People need to make sure that their money
            is safe and no one will steal it.
          </p>
        </div>

        <div class="lesson-summary-item">
          <div class="lesson-summary-icon">≋</div>
          <strong>Stable Value</strong>
          <p>
            People have to know that their money will be worth the same tomorrow as it is today. They won't use it if suddenly they are broke when they wake up!
          </p>
        </div>

        <div class="lesson-summary-item">
          <div class="lesson-summary-icon">⚡</div>
          <strong>Easy to Use</strong>
          <p>
            People should be able to pay easily and safely, without waiting for a long time and following the law.
          </p>
        </div>

      </div>

      <div class="callout lesson-final-takeaway">
        <strong>The Final Takeaway</strong>

        <p>
          Blockchain lets people send money and keep track of payments without one person or bank in charge. But creating a cryptocurrency is just the first step! For people to use it like regular money, stores need to accept it, people need to trust it, its value should stay very steady, and it needs to be easy to use.
        </p>
      </div>

      <div class="lesson-finish-actions">

        

        <button
          type="button"
          class="button"
          data-finish-lesson
        >
          ✓ Finish Lesson
        </button>

      </div>

      <p
        id="lesson-summary-finish-message"
        class="lesson-summary-finish-message"
        role="status"
        aria-live="polite"
      ></p>

    </div>
  `
    }
  ];

  //#region PERSONALIZATION
  const personalizedSave = (() => {
    try {
      return JSON.parse(
        localStorage.getItem('ftiCryptoProfile') || '{}'
      );
    } catch {
      return {};
    }
  })();

  let friendNames = Array.isArray(personalizedSave.friends)
    ? personalizedSave.friends
    : [];

  let currencyName =
    typeof personalizedSave.currency === 'string'
      ? personalizedSave.currency
      : '';

  let friendAssignment = Array.isArray(
    personalizedSave.assignment
  )
    ? personalizedSave.assignment
    : [0, 1, 2];

  function saveCryptoProfile() {
    try {
      localStorage.setItem('ftiCryptoProfile', JSON.stringify({
        friends: friendNames,
        currency: currencyName,
        assignment: friendAssignment
      }));
    } catch { }
  }

  function escapeStudentHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function shuffleFriendAssignment() {
    friendAssignment = [0, 1, 2];

    for (let i = 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [friendAssignment[i], friendAssignment[j]] =
        [friendAssignment[j], friendAssignment[i]];
    }
  }

  function friend(index) {
    if (friendNames.length !== 3) {
      return ['Alice', 'Bob', 'Chen'][index % 3];
    }

    return friendNames[
      friendAssignment[index % 3]
    ];
  }

  function currency() {
    return currencyName || 'LD';
  }

  // Replace placeholders only in freshly generated lesson content.
  // Do not repeatedly personalize already-rendered student names.
  function personalizeText(text) {
    const characters = {
      Alice: friend(0), Bob: friend(1), Chen: friend(2),
      Charlie: friend(2), Dana: friend(1), David: friend(1),
      Emma: friend(2), Leo: friend(0)
    };
    return String(text)
      .replace(/\b(Alice|Bob|Chen|Charlie|Dana|David|Emma|Leo)\b/g,
        name => characters[name])
      .replace(/\bLD\s*\(Ledger Dollars\)/g, currency())
      .replace(/\b(LD|LY)\b/g, currency());
  }

  function personalizeElement(element) {
    if (!element) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.parentElement?.closest('input, textarea, script, style')) continue;
      node.textContent = personalizeText(node.textContent);
    }
  }

  // Converts a new demonstration template once, before inserting it.
  function demoHTML(template) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = template;
    personalizeElement(wrapper);
    return wrapper.innerHTML;
  }

  function showFriendsSetup() {
    $('slideSection').textContent = 'GET STARTED';
    $('slideCount').textContent = 'BEFORE SLIDE 1';

    $('slideContent').innerHTML = `
    <div class="crypto-setup">
      <h2>Create Your Crypto Adventure!</h2>

      <p class="lead">
        Choose three friends to help you make your
        cryptocurrency.
      </p>

      <form id="cryptoFriendsForm">
        <label for="cryptoFriend1">Friend 1</label>
        <input id="cryptoFriend1" maxlength="24"
          placeholder="First name or nickname" required>

        <label for="cryptoFriend2">Friend 2</label>
        <input id="cryptoFriend2" maxlength="24"
          placeholder="First name or nickname" required>

        <label for="cryptoFriend3">Friend 3</label>
        <input id="cryptoFriend3" maxlength="24"
          placeholder="First name or nickname" required>

        <p class="fine-print">
          Use nicknames if you prefer.
          You don't need to enter anyone's full name.
        </p>

        <p id="cryptoFriendsError"
          class="crypto-setup-error"
          aria-live="polite"></p>

        <button class="button" type="submit">
          Start Learning →
        </button>
      </form>
    </div>
  `;

    $('prevSlide').hidden = true;
    $('nextSlide').hidden = true;
    $('slideDots').innerHTML = '';
    renderMap();
  }
  //#endregion

  const saved = (() => { try { return JSON.parse(localStorage.getItem('ftiCryptoLab') || '{}'); } catch { return {}; } })();
  let slideIndex = Math.min(Number.isInteger(saved.slideIndex) ? saved.slideIndex : 0, slides.length - 1);
  let doneSections = new Set(Array.isArray(saved.doneSections) ? saved.doneSections : []);
  let miningOpened = saved.miningOpened === true;
  let chainOpened = saved.chainOpened === true;
  const sectionFirst = sectionNames.map((_, s) => slides.findIndex(sl => sl.section === s));
  const sectionLast = sectionNames.map((_, s) => slides.map(sl => sl.section).lastIndexOf(s));

  //#region SLIDE FUNCS
  function saveProgress() { try { localStorage.setItem('ftiCryptoLab', JSON.stringify({ slideIndex, doneSections: [...doneSections], miningOpened, chainOpened })); } catch { } }
  function renderMap() {
    $('sectionMap').innerHTML = sectionNames.map((name, s) => `<button class="map-item ${slides[slideIndex].section === s ? 'active' : ''} ${doneSections.has(s) ? 'done' : ''}" type="button" data-section="${s}"><span class="map-number">${doneSections.has(s) ? '✓' : s + 1}</span><span>${name}</span></button>`).join('');
    $('progressText').textContent = `${slideIndex + 1} of ${slides.length}`;
    $('progressBar').style.width = `${((slideIndex + 1) / slides.length) * 100}%`;
  }

  function renderSlide() {
    // Show the friend setup before the first lesson slide.
    if (friendNames.length !== 3) {
      showFriendsSetup();
      return;
    }

    $('prevSlide').hidden = false;

    const slide = slides[slideIndex];

    $('slideSection').textContent =
      `PART ${slide.section + 1} · ` +
      sectionNames[slide.section].toUpperCase();

    $('slideCount').textContent =
      `SLIDE ${slideIndex + 1} / ${slides.length}`;

    let body = slide.body;

    // This slide introduces the student's own currency.
    if (slide.title === 'Rules give the currency meaning') {
      const originalIntroduction =
        /<p>Let's pretend our .*?<\/p>/s;

      const currencyIntroduction = currencyName
        ? `
        <p>
          Welcome to your new currency:
          <strong>${escapeStudentHTML(currencyName)}</strong>!
          Everyone starts with a set amount.
          Nobody can spend more than they have.
        </p>
      `
        : `
        <div class="crypto-currency-creator">
          <h3>Name Your Cryptocurrency!</h3>
          <p>
            Imagine creating your very own money.
            What would you call it?
          </p>

          <form id="cryptoCurrencyForm">
            <label for="cryptoCurrencyInput">
              Your currency's name
            </label>

            <div class="crypto-currency-controls">
              <input
                id="cryptoCurrencyInput"
                maxlength="24"
                placeholder="Example: Star Coins"
                required
              />

              <button class="button" type="submit">
                Create Currency
              </button>
            </div>
          </form>

          <p id="cryptoCurrencyError"
            class="crypto-setup-error"
            aria-live="polite"></p>
        </div>

        <p>
          Your new currency will have rules:
          everyone starts with a set amount
          and cannot spend more than they have.
        </p>
      `;

      body = body.replace(
        originalIntroduction,
        currencyIntroduction
      );
    }

    $('slideContent').innerHTML = `
    <h2>${slide.title}</h2>
    <p class="lead">${slide.lead}</p>
    ${body}
  `;

    personalizeElement($('slideContent'));

    $('prevSlide').disabled = slideIndex === 0;
    $('prevSlide').style.opacity =
      slideIndex === 0 ? '.45' : '1';

    // The final slide has its own Review/Finish buttons.
    $('nextSlide').hidden =
      slideIndex === slides.length - 1;

    $('nextSlide').textContent = 'Next →';

    $('slideDots').innerHTML = slides.map((sl, i) =>
      sl.section === slide.section
        ? `<button
          type="button"
          class="slide-dot ${i === slideIndex ? 'active' : ''}"
          aria-label="Go to slide ${i + 1}"
          data-slide="${i}">
        </button>`
        : ''
    ).join('');

    renderMap();
    saveProgress();
  }

  $('slideContent').addEventListener('submit', event => {

    // Three-friends setup
    if (event.target.id === 'cryptoFriendsForm') {
      event.preventDefault();

      const names = [1, 2, 3].map(n =>
        $(`cryptoFriend${n}`).value.trim()
      );

      const uniqueNames = new Set(
        names.map(name => name.toLowerCase())
      );

      if (
        names.some(name => !name) ||
        uniqueNames.size !== 3
      ) {
        $('cryptoFriendsError').textContent =
          'Please enter three different names.';
        return;
      }

      friendNames = names;
      shuffleFriendAssignment();
      saveCryptoProfile();

      slideIndex = 0;
      renderSlide();
      return;
    }

    // Currency naming
    if (event.target.id === 'cryptoCurrencyForm') {
      event.preventDefault();

      const chosen = $('cryptoCurrencyInput').value.trim();

      if (!chosen) {
        $('cryptoCurrencyError').textContent =
          'Please choose a name for your currency.';
        return;
      }

      currencyName = chosen;
      saveCryptoProfile();
      renderSlide();
    }
  });

  function showMiningPuzzle() {
    const miningLab = $('miningLab');
    if (miningLab) {
      miningLab.classList.remove('mining-locked');
      miningOpened = true;
      saveProgress();
    }
  }


  function advance() {
    const current = slides[slideIndex].section;

    if (slideIndex >= sectionLast[current]) {
      doneSections.add(current);
    }

    slideIndex =
      slideIndex === slides.length - 1
        ? 0
        : slideIndex + 1;

    renderSlide();

    // Scroll to the top of the new lesson slide.
    const lesson = document.querySelector('.lesson-card');

    if (lesson) {
      lesson.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }


  $('prevSlide').addEventListener('click', () => {
    slideIndex = Math.max(0, slideIndex - 1);

    renderSlide();

    document.querySelector('.lesson-card')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  $('nextSlide').addEventListener('click', advance);
  $('sectionMap').addEventListener('click', e => { const b = e.target.closest('[data-section]'); if (!b) return; slideIndex = sectionFirst[Number(b.dataset.section)]; renderSlide(); });
  $('slideDots').addEventListener('click', e => { const b = e.target.closest('[data-slide]'); if (b) { slideIndex = Number(b.dataset.slide); renderSlide(); } });
  $('resetProgress').addEventListener('click', () => {
    // Clear lesson progress.
    try {
      localStorage.removeItem('ftiCryptoLab');

      // Clear the student's three names and currency.
      localStorage.removeItem('ftiCryptoProfile');
    } catch { }

    // Restart the entire lesson and both games.
    window.location.reload();
  });

  // One delegated handler for all dynamically rendered slide controls.
  document.addEventListener('click', event => {
    const jump = event.target.closest('[data-jump]');
    if (jump) {
      const target = $(jump.dataset.jump);
      if (!target) return;
      if (jump.dataset.jump === 'miningLab') {
        showMiningPuzzle();
        if (!miningRoundStarted) {
          miningRoundStarted = true;
          newMiningRound();
        }
      }
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const demo = event.target.closest('[data-demo]');
    if (!demo) return;
    const type = demo.dataset.demo;

    if (type === 'transaction') {
      const area = $('ledgerDemo');
      if (!area) return;
      area.hidden = false;
      const entries = [
        `${friend(0)} → ${friend(1)} · $3`,
        `${friend(1)} → ${friend(2)} · $2`,
        `${friend(2)} → ${friend(0)} · $1`
      ];
      const count = Number(area.dataset.count || 0);
      if (count < entries.length) {
        const line = document.createElement('div');
        const bold = document.createElement('strong');
        bold.textContent = 'Transaction: ';
        line.append(bold, document.createTextNode(entries[count]));
        area.appendChild(line);
        area.dataset.count = String(count + 1);
      } else {
        const existing = area.querySelector('[data-ledger-finished]');
        if (!existing) {
          const note = document.createElement('p');
          note.dataset.ledgerFinished = 'true';
          note.textContent = 'All three example transactions are in the ledger!';
          area.appendChild(note);
        }
      }
      return;
    }

    const payment = 'Alice pays Bob 3 LD';
    const changed = 'Alice pays Bob 8 LD';
    if (type === 'sign') {
      $('signatureDemo').innerHTML = demoHTML(
        `<strong>Message:</strong> ${payment}<br>` +
        `<strong>Signature:</strong> <code>sig_7F2A…</code><br>` +
        `<strong>Verification:</strong> valid for this exact message`
      );
    } else if (type === 'change') {
      $('signatureDemo').innerHTML = demoHTML(
        `<strong>Changed message:</strong> ${changed}<br>` +
        `<strong>Original signature:</strong> <code>sig_7F2A…</code><br>` +
        `<strong>Verification:</strong> invalid — the message changed!`
      );
    } else if (type === 'copies') {
      $('copiesDemo').innerHTML = demoHTML(
        `<strong>Copy A ✓</strong> ${payment}<br>` +
        `<strong>Copy B ✓</strong> ${payment}<br>` +
        `<strong>Copy C ✓</strong> ${payment}`
      );
    } else if (type === 'tamperCopy') {
      $('copiesDemo').innerHTML = demoHTML(
        `<strong>Copy A ✓</strong> ${payment}<br>` +
        `<strong>Copy B ⚠</strong> ${changed} ` +
        `<span class="demo-mismatch">← mismatch!</span><br>` +
        `<strong>Copy C ✓</strong> ${payment}<br><br>` +
        `<em>Which copies agree with each other?</em>`
      );
    } else if (type === 'hash' || type === 'hashChange') {
      const msg = type === 'hash' ? payment : changed;
      const fingerprint = toyHash(personalizeText(msg));
      $('hashDemo').innerHTML = demoHTML(
        `<strong>Message:</strong> ${msg}<br>` +
        `<strong>Fingerprint:</strong> <code>${fingerprint}</code><br><br>` +
        `<em>What changed about the message and its fingerprint?</em>`
      );
    }
  });

  // Return buttons are static HTML, so register them once.
  ['returnToLesson', 'returnToChainLesson'].forEach(id => {
    const button = $(id);
    if (button) button.addEventListener('click', () => {
      $('lessonSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  $('slideContent').addEventListener('click', (event) => {

    // REVIEW AGAIN
    const reviewButton = event.target.closest(
      '[data-review-lesson]'
    );

    if (reviewButton) {
      // Return to Section 1, Slide 1.
      slideIndex = 0;

      // Update the slide, progress, and navigation.
      renderSlide();

      // Return to the slideshow.
      document.querySelector('.lesson-card')
        .scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      return;
    }

    // FINISH LESSON
    const finishButton = event.target.closest(
      '[data-finish-lesson]'
    );

    if (finishButton) {
      // Mark all six sections complete.
      doneSections = new Set(
        sectionNames.map((_, index) => index)
      );

      saveProgress();
      renderMap();

      const message = document.getElementById(
        'lesson-summary-finish-message'
      );

      if (message) {
        message.textContent =
          'Congratulations! You completed the cryptocurrency lesson!';
      }

      finishButton.disabled = true;
      finishButton.textContent = '✓ Lesson Complete';
    }
  });
  //#endregion

  //#region MINING_PUZZLE

  // A deterministic classroom hash: deliberately NOT cryptographic.
  // It works in file:// pages and is used only to illustrate changing inputs/outputs.
  function toyHash(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    // A small avalanche step makes the displayed result less obviously patterned.
    h ^= h >>> 16;
    h = Math.imul(h, 0x7feb352d);
    h ^= h >>> 15;
    h = Math.imul(h, 0x846ca68b);
    h ^= h >>> 16;
    return (h >>> 0).toString(16).padStart(8, '0').toUpperCase();
  }

  // Transaction-based mining puzzle.
  const NONCE_MIN = 1;
  let miningRound = 0;
  let miningAttempts = 0;
  let miningTransactions = [];
  let winningNonce = null;
  let miningBusy = false;
  let miningRoundStarted = false;
  let miningRoundComplete = false;

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function createMiningTransactions() {
    const transactions = [];

    const people = [
      friend(0),
      friend(1),
      friend(2)
    ];

    for (let i = 0; i < 5; i++) {
      const senderIndex = randomInteger(0, 2);

      let receiverIndex = randomInteger(0, 2);

      while (receiverIndex === senderIndex) {
        receiverIndex = randomInteger(0, 2);
      }

      const amount = randomInteger(1, 10);

      transactions.push(
        `${people[senderIndex]} pays ` +
        `${people[receiverIndex]} ` +
        `${amount} ${currency()}`
      );
    }

    return transactions;
  }



  function currentNonceMax() {
    if (miningRound === 1) return 10;
    if (miningRound === 2) return 100;
    return 1000;
  }

  function currentZeroCount() {
    return ((miningRound - 1) % 3) + 1;
  }

  function updateMiningStats() {
    $('miningAttempts').textContent = String(miningAttempts);
    $('miningDifficulty').textContent = `Round ${miningRound} · ${currentZeroCount()} zero${currentZeroCount() === 1 ? '' : 's'}`;
    $('miningTarget').textContent = '0'.repeat(currentZeroCount()) + '...';
  }

  function findWinningNonce() {
    // Randomly choose a guaranteed winning nonce
    // within the current round's range.
    return Math.floor(Math.random() * currentNonceMax()) + 1;
  }

  function miningHashForNonce(nonce) {
    const transactionsText = miningTransactions.join('|');
    const originalHash = String(
      toyHash(transactionsText + '|' + nonce)
    );

    const zeros = currentZeroCount();

    if (nonce === winningNonce) {
      // The correct nonce always produces a valid hash.
      return '0'.repeat(zeros) + originalHash.slice(zeros);
    }

    // Every other nonce produces an invalid hash.
    return '1' + originalHash.slice(1);
  }

  function newMiningRound() {
    if (miningBusy) return;

    miningBusy = true;

    // Hide the progression button until the current round is solved.
    $('newMiningRound').style.display = 'none';
    $('guessNonce').disabled = true;

    // Advance to the next round, or restart after round 3.
    if (miningRoundComplete) {
      if (miningRound >= 3) {
        miningRound = 0;
      }
      miningRoundComplete = false;
    }

    miningRound++;
    miningAttempts = 0;
    winningNonce = null;
    miningTransactions = createMiningTransactions();

    $('nonceInput').value = '';
    $('nonceInput').min = String(NONCE_MIN);
    $('nonceInput').max = String(currentNonceMax());
    $('nonceRange').textContent = `${NONCE_MIN} and ${currentNonceMax()}`;
    $('miningHash').textContent = 'Enter a number to calculate its pretend hash.';
    $('miningStatus').textContent = `Round ${miningRound} of 3`;
    $('miningStatus').className = 'mining-status';
    $('miningFeedback').className = 'feedback';
    $('miningFeedback').textContent = '';
    $('miningTransactions').replaceChildren();

    miningTransactions.forEach((transaction) => {
      const item = document.createElement('li');
      item.textContent = transaction;
      $('miningTransactions').appendChild(item);
    });

    updateMiningStats();
    winningNonce = findWinningNonce();

    const zeros = currentZeroCount();
    $('miningFeedback').textContent =
      `Find a number whose pretend hash starts with ${zeros} leading zero${zeros === 1 ? '' : 's'}.`;

    $('newMiningRound').textContent = 'Next Round';
    $('newMiningRound').style.display = 'none';

    miningBusy = false;
    $('guessNonce').disabled = false;
  }


  function tryMiningNonce() {
    if (miningBusy || winningNonce === null) return;
    const rawValue = $('nonceInput').value.trim();
    const guess = Number(rawValue);
    if (rawValue === '' || !Number.isInteger(guess) || guess < NONCE_MIN || guess > currentNonceMax()) {
      $('miningFeedback').className = 'feedback bad';
      $('miningFeedback').textContent = `Enter a whole number from ${NONCE_MIN} to ${currentNonceMax()}.`;
      return;
    }
    miningAttempts++;
    updateMiningStats();
    const hash = miningHashForNonce(guess);
    const meetsTarget = hash.startsWith('0'.repeat(currentZeroCount()));
    $('miningHash').textContent = hash;

    if (meetsTarget) {
      miningRoundComplete = true;

      $('miningStatus').className = 'mining-status success';
      $('miningFeedback').className = 'feedback good';

      if (miningRound < 3) {
        $('miningStatus').textContent = 'Block mined!';
        $('miningFeedback').textContent =
          `Great job! You solved Round ${miningRound} in ${miningAttempts} attempt${miningAttempts === 1 ? '' : 's'}. Scroll and click Next Round when you're ready.`;

        $('newMiningRound').textContent = 'Next Round';
      } else {
        $('miningStatus').textContent = '🎉 Congrats!';
        $('miningFeedback').textContent =
          `Congratulations! You completed all three mining rounds. You solved the final round in ${miningAttempts} attempt${miningAttempts === 1 ? '' : 's'}!`;

        $('newMiningRound').textContent = 'Play Again';
      }

      $('newMiningRound').style.display = 'inline-block';
      $('guessNonce').disabled = true;

      doneSections.add(3);
      saveProgress();
      renderMap();
      return;
    }

    $('miningStatus').textContent = 'Not mined yet';
    $('miningStatus').className = 'mining-status failure';
    // Directional hints are only a game mechanic; real hashes have no such direction.
    $('miningFeedback').className = 'feedback';
    $('miningFeedback').textContent = guess < winningNonce
      ? 'Too low! Try a higher number — a guessing-game hint, not how real hashes behave.'
      : 'Too high! Try a lower number — a guessing-game hint, not how real hashes behave.';
  }

  $('guessNonce').addEventListener('click', tryMiningNonce);
  $('nonceInput').addEventListener('keydown', (event) => { if (event.key === 'Enter') tryMiningNonce(); });
  $('newMiningRound').addEventListener('click', newMiningRound);
  //#endregion

  //#region CHAIN_GAME

  (function () {
    function initChainGame() {
      const root = document.getElementById('cb-activity');
      if (!root || root.dataset.initialized === 'true') return;

      root.dataset.initialized = 'true';

      const $cb = (id) => document.getElementById('cb-' + id);

      const NONCE_MIN = 1;
      const NONCE_MAX = 10;


      function createChainTransactions() {
        const a = friend(0);
        const b = friend(1);
        const c = friend(2);
        const money = currency();

        return [
          `${a} pays ${b} 3 ${money}`,
          `${b} pays ${c} 1 ${money}`,
          `${c} pays ${a} 2 ${money}`,
          `${a} pays ${b} 1 ${money}`
        ];
      }

      let originalTransactions = [];

      let blocks = [];
      let stage = 'build';
      let originalHashes = [];
      let activeIndex = 1;
      let changedIndex = -1;
      let oldTransaction = '';
      let animationStep = -1;
      let attempts = 0;
      let timers = [];

      function randomNonce() {
        return Math.floor(Math.random() * NONCE_MAX) + 1;
      }

      function rawHash(text) {
        let hash = 2166136261;

        for (let i = 0; i < text.length; i++) {
          hash ^= text.charCodeAt(i);
          hash = Math.imul(hash, 16777619);
        }

        return (hash >>> 0).toString(16).padStart(8, '0');
      }

      // Classroom simulation: guarantees one winning nonce.
      function blockHash(block, nonce) {
        const input = [
          block.number,
          block.transaction,
          block.previousHash,
          nonce
        ].join('|');

        const base = rawHash(input);

        return (nonce === block.targetNonce ? '0' : 'f') +
          base.slice(1);
      }

      function createBlock(index) {
        return {
          number: index + 1,
          transaction: originalTransactions[index],
          previousHash: null,
          linked: false,
          targetNonce: randomNonce(),
          nonce: null,
          hash: null
        };
      }

      function escapeHTML(value) {
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }

      function setAlert(message, type = '') {
        const el = $cb('alert');
        el.textContent = message;
        el.className = 'cb-alert';

        if (type) el.classList.add('cb-' + type);
      }

      function clearAnimation() {
        timers.forEach(clearTimeout);
        timers = [];
      }

      function schedule(fn, delay) {
        timers.push(setTimeout(fn, delay));
      }

      function isWorking() {
        return stage === 'build' || stage === 'repair';
      }

      function isMined(block) {
        return block.nonce !== null && block.hash !== null;
      }

      function updateProgress() {
        const mined = blocks.filter(isMined).length;

        $cb('progress').textContent =
          mined + ' of 4 blocks mined';

        const labels = {
          build: 'Stage 1: Build',
          ready: 'Chain Complete',
          animating: 'Stage 2: Surprise!',
          'repair-ready': 'Stage 2: Broken Chain',
          repair: 'Stage 3: Repair',
          finished: 'Completed!'
        };

        $cb('stage').textContent = labels[stage];
      }

      function initializeGame() {
        clearAnimation();
        originalTransactions = createChainTransactions();

        stage = 'build';
        activeIndex = 1;
        changedIndex = -1;
        oldTransaction = '';
        animationStep = -1;
        attempts = 0;
        originalHashes = [];

        blocks = originalTransactions.map((_, i) =>
          createBlock(i)
        );

        // Genesis block starts already connected and mined.
        const genesis = blocks[0];

        genesis.previousHash = 'FIRST';
        genesis.linked = true;
        genesis.nonce = genesis.targetNonce;
        genesis.hash = blockHash(genesis, genesis.nonce);

        $cb('change-details').hidden = true;
        $cb('finish').hidden = true;
        $cb('complete').hidden = true;
        $cb('start-repair').hidden = true;
        $cb('skip').hidden = true;
        $cb('play-again').hidden = true;
        $cb('miner').hidden = true;

        setAlert(
          "Copy Block 1's hash into Block 2's Previous Hash field."
        );

        render();
      }

      // =========================================
      // DETERMINE BLOCK APPEARANCE
      // =========================================

      function getStatus(index) {
        const block = blocks[index];

        // Unreached blocks are completely blank.
        if (stage === 'build' && index > activeIndex) {
          return 'blank';
        }

        // Original altered block during the surprise.
        if (
          index === changedIndex &&
          (stage === 'animating' || stage === 'repair-ready')
        ) {
          return 'invalid';
        }

        // Show downstream effects progressively.
        if (
          stage === 'animating' &&
          index > changedIndex &&
          index <= animationStep
        ) {
          return 'affected';
        }

        if (
          stage === 'repair-ready' &&
          index > changedIndex
        ) {
          return 'affected';
        }

        // Blocks waiting for repair.
        if (
          stage === 'repair' &&
          index >= activeIndex
        ) {
          return index === activeIndex
            ? 'awaiting-link'
            : 'affected';
        }

        // Current block is not yet connected.
        if (
          isWorking() &&
          index === activeIndex &&
          !block.linked
        ) {
          return 'awaiting-link';
        }

        if (!isMined(block)) {
          return 'awaiting-link';
        }

        if (block.hash !== blockHash(block, block.nonce)) {
          return 'invalid';
        }

        if (
          index > 0 &&
          block.previousHash !== blocks[index - 1].hash
        ) {
          return 'invalid';
        }

        return 'valid';
      }

      // =========================================
      // RENDER BLOCKS
      // =========================================

      function render() {
        const statusLabels = {
          valid: 'Valid',
          invalid: 'Changed!',
          affected: 'Affected',
          'awaiting-link': 'Not connected'
        };

        $cb('chain').innerHTML = blocks.map((block, index) => {
          const status = getStatus(index);

          // Blank future blocks have NO inner content.
          if (status === 'blank') {
            return `
            <article class="cb-block cb-blank"
              aria-label="Future block"></article>
          `;
          }

          const isActive =
            isWorking() && index === activeIndex;

          const needsLink =
            isActive && !block.linked;

          const isChanged =
            index === changedIndex &&
            (stage === 'animating' ||
              stage === 'repair-ready');

          let transactionHTML =
            escapeHTML(block.transaction);

          if (isChanged) {
            transactionHTML = `
            <span class="cb-old">
              ${escapeHTML(oldTransaction)}
            </span>
            <br>
            <span class="cb-new">
              ${escapeHTML(block.transaction)}
            </span>
          `;
          }

          // The previous hash is editable only when
          // connecting or reconnecting this block.
          let previousHashHTML;

          if (needsLink) {
            previousHashHTML = `
            <input
              type="text"
              class="cb-link-input"
              id="cb-link-input-${index}"
              placeholder="Paste previous hash here"
              autocomplete="off"
              spellcheck="false"
            />

            <button
              type="button"
              class="cb-connect-button"
              data-connect="${index}"
            >
              Connect Hash
            </button>

            <div class="cb-link-help">
              ${index === 0
                ? 'Enter FIRST'
                : 'Copy the hash from Block ' + index}
            </div>

            <div
              class="cb-link-error"
              id="cb-link-error-${index}"
              aria-live="polite"
            ></div>
          `;
          } else {
            previousHashHTML = `
            <span class="cb-hash-value">
              ${escapeHTML(block.previousHash ?? '—')}
            </span>
          `;
          }

          let hashHTML = '';

          const showOriginalHash =
            originalHashes.length === blocks.length &&
            changedIndex >= 0 &&
            index >= changedIndex &&
            stage !== 'build' &&
            stage !== 'ready' &&
            stage !== 'finished';

          // Show the saved hash from before the surprise.
          if (showOriginalHash && originalHashes[index]) {
            hashHTML += `
    <span class="cb-original-hash">
      ${escapeHTML(originalHashes[index])}
    </span>
    <span class="cb-original-label">
      Original hash (before change)
    </span>
  `;
          }

          // Show the current or newly mined hash.
          if (block.hash === null) {
            hashHTML += `
    <span class="cb-field-value">
      Not re-mined yet
    </span>
  `;
          } else if (
            showOriginalHash &&
            block.hash === originalHashes[index]
          ) {
            hashHTML += `
    <span class="cb-field-value cb-hash-pending">
      Awaiting updated hash
    </span>
  `;
          } else {
            hashHTML += `
    <span class="cb-hash-value">
      ${escapeHTML(block.hash)}
    </span>
    ${showOriginalHash
                ? '<span class="cb-new-hash-label">Current hash</span>'
                : ''}
  `;
          }


          const recalculated =
            isChanged && isMined(block)
              ? blockHash(block, block.nonce)
              : null;

          const mismatchHTML =
            recalculated !== null &&
              recalculated !== block.hash
              ? `
              <div class="cb-field">
                <span class="cb-field-label">
                  Recalculated Hash
                </span>
                <span class="cb-hash-value cb-recalculated">
                  ${escapeHTML(recalculated)}
                </span>
              </div>
            `
              : '';

          return `
          <article
            id="cb-block-${index}"
            class="cb-block cb-${status}"
          >
            <div class="cb-block-header">
              <h3>Block ${block.number}</h3>
              <span class="cb-status">
                ${statusLabels[status]}
              </span>
            </div>

            <!-- 1. PREVIOUS HASH -->
            <div class="cb-field">
              <span class="cb-field-label">
                Previous Hash
              </span>
              ${previousHashHTML}
            </div>

            <!-- 2. TRANSACTION -->
            <div class="cb-field">
              <span class="cb-field-label">
                Transaction
              </span>
              <div class="cb-field-value">
                ${transactionHTML}
              </div>
            </div>

            <!-- 3. THIS BLOCK'S HASH -->
            <div class="cb-field">
              <span class="cb-field-label">
                This Block's Hash
              </span>
              ${hashHTML}
            </div>

            ${mismatchHTML}
          </article>
        `;
        }).join('');

        // Connect buttons are recreated after each render.
        $cb('chain').querySelectorAll('[data-connect]')
          .forEach(button => {
            button.addEventListener('click', () => {
              connectBlock(Number(button.dataset.connect));
            });
          });

        $cb('chain').querySelectorAll('.cb-link-input')
          .forEach(input => {
            input.addEventListener('keydown', event => {
              if (event.key === 'Enter') {
                connectBlock(activeIndex);
              }
            });
          });

        updateProgress();
        updateMinerVisibility();
      }

      // =========================================
      // STUDENT CONNECTS PREVIOUS HASH
      // =========================================

      function connectBlock(index) {
        if (!isWorking() || index !== activeIndex) return;

        const block = blocks[index];

        if (block.linked) return;

        const input = document.getElementById(
          'cb-link-input-' + index
        );

        if (!input) return;

        const entered = input.value.trim();

        const expected = index === 0
          ? 'FIRST'
          : blocks[index - 1].hash;

        if (entered !== expected) {
          const error = document.getElementById(
            'cb-link-error-' + index
          );

          error.textContent =
            "The hashes don't match. Copy the exact previous hash.";

          setAlert(
            'The previous hash is incorrect. Check the block before it.',
            'danger'
          );

          return;
        }

        // Only a matching hash unlocks mining.
        block.previousHash = entered;
        block.linked = true;

        setAlert(
          'Connection successful! Block ' +
          block.number + ' is ready to mine.',
          'success'
        );

        prepareMiner();
        render();
      }

      function updateMinerVisibility() {
        if (!isWorking()) {
          $cb('miner').hidden = true;
          return;
        }

        const block = blocks[activeIndex];

        $cb('miner').hidden =
          !block.linked || isMined(block);
      }

      function prepareMiner() {
        attempts = 0;

        $cb('miner-title').textContent =
          (stage === 'repair' ? 'Re-mine Block ' : 'Mine Block ') +
          blocks[activeIndex].number;

        $cb('nonce').value = '';
        $cb('feedback').textContent = '';
        $cb('attempts').textContent = 'Attempts: 0';
      }

      // =========================================
      // MINING
      // =========================================

      function tryNonce() {
        if (!isWorking()) return;

        const block = blocks[activeIndex];

        // Critical: mining is impossible until linked.
        if (!block.linked) return;

        const input = $cb('nonce');
        const guess = Number(input.value);

        if (
          input.value.trim() === '' ||
          !Number.isInteger(guess) ||
          guess < NONCE_MIN ||
          guess > NONCE_MAX
        ) {
          $cb('feedback').textContent =
            'Enter a whole number between 1 and 10.';
          return;
        }

        attempts++;
        $cb('attempts').textContent =
          'Attempts: ' + attempts;

        if (guess < block.targetNonce) {
          $cb('feedback').textContent =
            'Too low! Try a larger number.';
          return;
        }

        if (guess > block.targetNonce) {
          $cb('feedback').textContent =
            'Too high! Try a smaller number.';
          return;
        }

        // Correct nonce.
        block.nonce = guess;
        block.hash = blockHash(block, guess);

        if (stage === 'build') {
          finishBuildStep();
        } else {
          finishRepairStep();
        }

        render();
      }

      function finishBuildStep() {
        const completedNumber = blocks[activeIndex].number;

        // Move forward only after successful mining.
        if (activeIndex < 3) {
          activeIndex++;

          $cb('miner').hidden = true;

          setAlert(
            'Block ' + completedNumber +
            ' mined! Copy its hash into Block ' +
            (activeIndex + 1) + '.',
            'success'
          );

          return;
        }

        // All four blocks must be mined.
        // Do NOT trigger the surprise here.
        stage = 'ready';

        $cb('miner').hidden = true;
        $cb('complete').hidden = false;

        setAlert(
          'All four blocks are connected and mined! ' +
          'Click Complete Chain to finish.',
          'success'
        );
      }

      // =========================================
      // SURPRISE: ONLY COMPLETE CHAIN TRIGGERS IT
      // =========================================


      function changeTransaction(original) {
        // Find the payment amount, regardless of
        // what the student named their currency.
        const match = original.match(/\b\d+\b/);

        if (!match) {
          return original + ' (changed)';
        }

        const oldAmount = Number(match[0]);

        const newAmount =
          oldAmount + 1 + Math.floor(Math.random() * 8);

        return original.replace(
          /\b\d+\b/,
          String(newAmount)
        );
      }


      function startSurprise() {
        // Safety guard: never run before full completion.
        if (stage !== 'ready') return;

        const fullyBuilt = blocks.every((block, index) =>
          block.linked &&
          isMined(block) &&
          block.hash === blockHash(block, block.nonce) &&
          (
            index === 0 ||
            block.previousHash === blocks[index - 1].hash
          )
        );

        if (!fullyBuilt) return;
        // Save the original hashes before any transactions change.
        originalHashes = blocks.map(block => block.hash);

        stage = 'animating';

        $cb('complete').hidden = true;
        $cb('skip').hidden = false;
        $cb('miner').hidden = true;

        // Randomly select Block 1, 2, or 3.
        changedIndex = Math.floor(Math.random() * 3);


        const block = blocks[changedIndex];

        oldTransaction = block.transaction;
        block.transaction = changeTransaction(block.transaction);

        animationStep = changedIndex;

        $cb('old-transaction').textContent = oldTransaction;
        $cb('new-transaction').textContent = block.transaction;

        $cb('change-explanation').textContent =
          'Block ' + block.number +
          ' has an unexpected transaction change.';

        $cb('change-details').hidden = false;

        setAlert(
          'Oh no! Someone changed Block ' +
          block.number + '!',
          'danger'
        );

        render();

        const changedCard = document.getElementById(
          'cb-block-' + changedIndex
        );

        if (changedCard) {
          changedCard.classList.add('cb-flash', 'cb-shake');
        }

        let delay = 850;

        // Show affected blocks from left to right.
        for (let i = changedIndex + 1; i < 4; i++) {
          const index = i;

          schedule(() => {
            animationStep = index;

            setAlert(
              'Block ' + (index + 1) +
              ' is affected by the earlier change!',
              'danger'
            );

            render();
          }, delay);

          delay += 650;
        }

        schedule(finishSurprise, delay + 350);
      }

      function finishSurprise() {
        if (stage !== 'animating') return;

        clearAnimation();

        stage = 'repair-ready';
        animationStep = 3;

        $cb('skip').hidden = true;
        $cb('start-repair').hidden = false;

        setAlert(
          'Your chain needs repair! Start with Block ' +
          (changedIndex + 1) + '.',
          'danger'
        );

        render();
      }

      // =========================================
      // REPAIR: RECONNECT AND RE-MINE EACH BLOCK
      // =========================================

      function startRepair() {
        if (stage !== 'repair-ready') return;

        stage = 'repair';
        activeIndex = changedIndex;


        $cb('start-repair').hidden = true;
        $cb('miner').hidden = true;

        // Hide the surprise explanation once repair begins.
        $cb('change-details').hidden = true;


        // Invalidate affected blocks while preserving
        // the modified transaction and unaffected blocks.
        for (let i = changedIndex; i < 4; i++) {
          blocks[i].previousHash = null;
          blocks[i].linked = false;
          blocks[i].nonce = null;
          blocks[i].hash = null;
          blocks[i].targetNonce = randomNonce();
        }

        setAlert(
          'Reconnect Block ' + (activeIndex + 1) +
          ' by entering its previous hash.'
        );

        render();
      }

      function finishRepairStep() {
        const repairedNumber = blocks[activeIndex].number;

        if (activeIndex < 3) {
          activeIndex++;

          $cb('miner').hidden = true;

          setAlert(
            'Block ' + repairedNumber +
            ' repaired! Now reconnect Block ' +
            (activeIndex + 1) + '.',
            'success'
          );

          return;
        }

        completeRepair();
      }

      function completeRepair() {
        const valid = blocks.every((block, index) => {
          if (!block.linked || !isMined(block)) return false;

          if (block.hash !== blockHash(block, block.nonce)) {
            return false;
          }

          if (!block.hash.startsWith('0')) return false;

          const expected = index === 0
            ? 'FIRST'
            : blocks[index - 1].hash;

          return block.previousHash === expected;
        });

        if (!valid) {
          setAlert(
            'A block still needs repair. Check its hash connection.',
            'danger'
          );
          return;
        }

        stage = 'finished';
        changedIndex = -1;

        $cb('miner').hidden = true;
        $cb('change-details').hidden = true;
        $cb('finish').hidden = false;
        $cb('play-again').hidden = false;

        setAlert(
          'Congratulations! Your blockchain is valid again.',
          'success'
        );
      }

      // =========================================
      // EVENT LISTENERS
      // =========================================

      $cb('try').addEventListener('click', tryNonce);

      $cb('nonce').addEventListener('keydown', event => {
        if (event.key === 'Enter') tryNonce();
      });

      // This is the ONLY event that starts the surprise.
      $cb('complete').addEventListener('click', startSurprise);

      $cb('skip').addEventListener('click', () => {
        if (stage === 'animating') finishSurprise();
      });

      $cb('start-repair').addEventListener('click', startRepair);

      $cb('play-again').addEventListener(
        'click',
        initializeGame
      );

      document.addEventListener('click', function (event) {
        const startButton = event.target.closest('#startChainGame');

        if (!startButton) return;

        const chainGame = document.getElementById('cb-activity');

        if (!chainGame) {
          console.error('Chain game section not found!');
          return;
        }

        // Start a new personalized chain using the submitted friends/currency.
        initializeGame();
        chainGame.hidden = false;
        chainOpened = true;
        saveProgress();

        // Remove any inline hiding left by other code.
        chainGame.style.removeProperty('display');

        // Scroll to the newly revealed game.
        chainGame.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });

      initializeGame();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initChainGame);
    } else {
      initChainGame();
    }
  })();

  //#endregion

  
  /* ================================================
     PERSIST GAME VISIBILITY AFTER REFRESH
     ================================================ */

  const GAME_VISIBILITY_KEY = 'ftiCryptoGameVisibility';

  // Read saved game visibility.
  function loadGameVisibility() {
    try {
      const data = JSON.parse(
        localStorage.getItem(GAME_VISIBILITY_KEY) || '{}'
      );

      return {
        mining: data.mining === true || miningOpened,
        chain: data.chain === true || chainOpened
      };
    } catch {
      return {
        mining: miningOpened,
        chain: chainOpened
      };
    }
  }

  // Save whether each game has been opened.
  function saveGameVisibility(game) {
    const state = loadGameVisibility();

    state[game] = true;

    try {
      localStorage.setItem(
        GAME_VISIBILITY_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.warn('Could not save game visibility:', error);
    }
  }

  // Restore games when the page loads.
  function restoreGameVisibility() {
    const state = loadGameVisibility();

    // Restore mining puzzle.
    if (state.mining) {
      showMiningPuzzle();

      if (!miningRoundStarted) {
        miningRoundStarted = true;
        newMiningRound();
      }
    }

    // Restore blockchain challenge.
    if (state.chain) {
      const chainGame = document.getElementById('cb-activity');

      if (chainGame) {
        chainGame.hidden = false;
        chainGame.style.removeProperty('display');

        chainOpened = true;
        saveProgress();
      }
    }
  }

  // Save the game as soon as its launch button is clicked.
  // Capture phase lets this run before the existing game handlers.
  document.addEventListener('click', function (event) {

    const miningButton = event.target.closest(
      '[data-jump="miningLab"]'
    );

    if (miningButton) {
      saveGameVisibility('mining');
    }

    const chainButton = event.target.closest(
      '#startChainGame'
    );

    if (chainButton) {
      saveGameVisibility('chain');
    }

    // Reset Lesson must clear both games' saved visibility.
    const resetButton = event.target.closest('#resetProgress');

    if (resetButton) {
      try {
        localStorage.removeItem(GAME_VISIBILITY_KEY);
      } catch (error) {
        console.warn('Could not clear game visibility:', error);
      }

      miningOpened = false;
      chainOpened = false;
    }

  }, true);

  // Restore the games without scrolling away from the lesson.
  restoreGameVisibility();

  // Render the first slide when the page loads.
  renderSlide();

})();
