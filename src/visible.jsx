// MIT License
//
// Copyright (c) 2018 Matías Olivera
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// This hook is adapted from the react-use-visiblity hook's source code but with
// modifications to support serverside rendering.

import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'

export default function useVisibility({ partial = false, rate = 150 }) {
  const ref = useRef()
  const [isVisible, setVisibile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined')
      return

    function check() { setVisibile(checkVisibility(ref.current, partial)) }
    check()

    window.addEventListener('resize', check)
    window.addEventListener('scroll', check)

    return () => {
      window.removeEventListener('resize', check)
      window.addEventListener('scroll', check)
    }
  }, [partial])
  const [vis] = useDebounce(isVisible, rate)
  return [vis, ref]
}

function checkVisibility(el, partial) {
  if (!el || typeof window === 'undefined')
    return false;

  const {
    top,
    right,
    bottom,
    left,
    width,
    height,
  } = el.getBoundingClientRect();

  if (top + right + bottom + left === 0) {
    return false;
  }

  const topCheck = partial ? top + height : top;
  const bottomCheck = partial ? bottom - height : bottom;
  const rightCheck = partial ? right - width : right;
  const leftCheck = partial ? left + width : left;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return (
    topCheck >= 0 &&
    leftCheck >= 0 &&
    bottomCheck <= windowHeight &&
    rightCheck <= windowWidth
  );
}
